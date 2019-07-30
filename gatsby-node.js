const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require(`lodash`);

const oldPaths = [
  '/2017/09/13/Dynamic-Programming/',
  '/2017/10/18/lab03-Linear-Regression-Cost-Min/',
  '/2018/03/13/DeepLearning-Study-Road/',
  '/2018/03/18/kaggle-titanic/',
  '/2018/03/18/nlp-basic/',
  '/2018/07/29/n-gram/',
  '/2018/08/27/selection-sort-with-python/',
  '/2018/10/20/classification-ml/',
  '/2018/10/29/ps-kiwi-juice-easy/',
  '/2018/10/29/ps-top-coder-intro/',
  '/2018/10/31/markdown-dictionary/',
  '/2018/11/04/ps-interesting-party/',
  '/2018/11/05/ps-cryptography/',
  '/2018/11/06/ps-interesting-digits/',
  '/2018/11/18/lostark-wait-notifier/',
  '/2018/11/23/lostark-wait-notifier-2/',
  '/2018/12/04/file-is-a-commonjs-module/',
  '/2018/12/17/simple-resume/',
  '/2019/02/13/how-to-setup-free-ssl/',
  '/2019/02/14/how-to-setup-free-ssl-2/',
]

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "YYYY.MM.DD")
                emoji
                category
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const posts = result.data.allMarkdownRemark.edges;

    const newPaths = posts.map((post) => post.node.fields.slug);

    _.each(newPaths, (newPath) => {
      const oldPath = _.find(oldPaths, (v) => {
        const endPointOldPath = v.split('/')[v.split('/').length - 2];
        return _.isEqual(newPath.replace(/\//gi, '').toLowerCase(), endPointOldPath.toLowerCase());
      });
      createRedirect({ fromPath: oldPath, toPath: newPath });
    });

    // Create category posts pages
    // ref: https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
    let categories = [];
    posts.forEach(post => {
      if (post.node.frontmatter.category) {
        categories.push(post.node.frontmatter.category);
      }
    });
    categories = new Set(categories);
    categories.forEach(category => {
      createPage({
        path: `/category/${category.replace(/\s/, '-')}/`,
        component: path.resolve("src/templates/categories.tsx"),
        context: {
          category
        }
      });
    });

    // get related Posts(retrive maximum 5 posts for each category)
    let allRelatedPosts = {};
    categories.forEach(category => {
      let categoryPosts = posts.filter(post => {
        return post.node.frontmatter.category === category;
      });
      allRelatedPosts[category] = categoryPosts
        ? categoryPosts.slice(0, 5)
        : [];
    });

    // Create blog posts pages.
    posts.forEach((post, index) => {
      // const previous =
      //   index === posts.length - 1 ? null : posts[index + 1].node;
      // const next = index === 0 ? null : posts[index - 1].node;

      // setup related posts
      // get the posts that has same categories.
      let relatedPosts = allRelatedPosts[post.node.frontmatter.category];
      // remove myself
      relatedPosts = relatedPosts.filter(relatedPost => {
        return !(relatedPost.node.fields.slug === post.node.fields.slug);
      });

      createPage({
        path: post.node.fields.slug,
        component: path.resolve(`./src/templates/post.tsx`),
        context: {
          slug: post.node.fields.slug,
          relatedPosts
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
