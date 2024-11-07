import path from "path";
import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      query GetPages {
        allMdx(sort: { frontmatter: { date: DESC } }, limit: 1000) {
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
  );
  if (result.errors) {
    throw result.errors;
  }
  const nodes = (result.data as any).allMdx.nodes;

  let categories: Set<string> = new Set();

  nodes.forEach((node) => {
    if (node.frontmatter.category) {
      categories.add(node.frontmatter.category); // Set에 추가
    }
  });
  categories = new Set(categories);
  categories.forEach((category) => {
    createPage({
      path: `/category/${category.replace(/\s/, "-")}/`,
      component: path.resolve("src/templates/categories.tsx"),
      context: {
        category,
      },
    });
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
