import { graphql, HeadProps, PageProps } from "gatsby";
import React from "react";
import styled from "styled-components";
import CategoryMenu from "../components/CategoryMenu";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { CategoryPageContext } from "../models";
import SEO from "../components/SEO";
import CategoryJsonLD from "../components/json/CategoryJsonLd";

const Heading = styled.h1`
  margin: 0.5em 0 0.8em;
  font-size: 32px;
  color: #fff;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: 1px;
`;

const CategoryTemplate = ({
  data,
  pageContext,
  location,
}: PageProps<Queries.BlogPostByCategoryQuery, CategoryPageContext>) => {
  const posts = data.allMdx.nodes;
  // get Category name from category slug
  const categorySlug = pageContext.category;
  const categories = data.site!!.siteMetadata!!.categories;
  const categoryObject = categories!!.find((cat) => {
    return cat!!.slug === categorySlug;
  });
  // use slug when name doesn't exist
  const categoryName = categoryObject ? categoryObject.name : categorySlug;

  return (
    <Layout location={location} title={categoryName!!}>
      <CategoryMenu
        location={location}
        categories={categories!!.map((category) => {
          return {
            color: category!!.color!!,
            icon: category!!.icon!!,
            link: category!!.link!!,
            name: category!!.name!!,
            slug: category!!.slug!!,
          };
        })}
      />
      <Heading>{categoryName}</Heading>
      {posts.map(({ frontmatter }) => {
        return (
          <PostCard
            key={frontmatter!!.slug!!}
            frontmatter={{
              category: frontmatter!!.category!!,
              date: frontmatter!!.date!!,
              description: "",
              emoji: frontmatter!!.emoji!!,
              slug: frontmatter!!.slug!!,
              title: frontmatter!!.title!!,
            }}
          />
        );
      })}
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query BlogPostByCategory($category: String) {
    site {
      siteMetadata {
        categories {
          name
          slug
          color
          icon
          link
        }
      }
    }
    allMdx(
      limit: 1000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
          emoji
          category
          slug
        }
      }
    }
  }
`;

export const Head = ({
  data: { site },
  pageContext,
}: HeadProps<Queries.BlogPostByCategoryQuery, CategoryPageContext>) => {
  const categories = site!!.siteMetadata!!.categories;
  const categorySlug = pageContext.category;
  const categoryObject = categories!!.find((cat) => {
    return cat!!.slug === categorySlug;
  });
  const categoryName = categoryObject ? categoryObject.name : categorySlug;
  return (
    <SEO title={categoryName!!}>
      <CategoryJsonLD
        categorySlug={categorySlug}
        categoryName={categoryName!!}
      />
    </SEO>
  );
};