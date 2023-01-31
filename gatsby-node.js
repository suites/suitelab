const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require(`lodash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return graphql(
    `
      {
        allMdx(
          sort: { frontmatter: { date: DESC } }
          limit: 1000
        ) {
          nodes {
            id
            frontmatter {
              title
              date(formatString: "YYYY.MM.DD")
              emoji
              category
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const nodes = result.data.allMdx.nodes;

    // Create category posts pages
    // ref: https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
    let categories = [];
    nodes.forEach(node => {
      if (node.frontmatter.category) {
        categories.push(node.frontmatter.category);
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
      let categoryPosts = nodes.filter(post => {
        return post.frontmatter.category === category;
      });
      allRelatedPosts[category] = categoryPosts
        ? categoryPosts.slice(0, 5)
        : [];
    });

    // Create blog posts pages.
    nodes.forEach((node, index) => {
      // const previous =
      //   index === posts.length - 1 ? null : posts[index + 1].node;
      // const next = index === 0 ? null : posts[index - 1].node;

      // setup related posts
      // get the posts that has same categories.
      // let relatedPosts = allRelatedPosts[post.frontmatter.category];
      // // remove myself
      // relatedPosts = relatedPosts.filter(relatedPost => {
      //   return !(relatedPost.node.fields.slug === post.frontmatter.slug);
      // });

      createPage({
        path: node.frontmatter.slug,
        component: node.internal.contentFilePath,
        context: {
          id: node.id,
          // relatedPosts
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};