const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require(`lodash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(
    `
      query {
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