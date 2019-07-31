import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import CategoryMenu from '../components/CategoryMenu';
import CategoryJsonLd from '../components/json/CategoryJsonLd';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { QueryResult } from '../models';
import { CategoryPageContext } from '../models/PageContext';

const Heading = styled.h1`
  margin: 0.5em 0 0.8em;
  font-size: 32px;
  color: #fff;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: 1px;
`;

interface Props {
  data: QueryResult;
  pageContext: CategoryPageContext;
  location: any;
}
class CategoryTemplate extends React.Component<Props> {
  render() {
    const { data, pageContext } = this.props;
    const posts = data.allMarkdownRemark.edges;
    const { location } = this.props;
    // get Category name from category slug
    const categorySlug = pageContext.category;
    const categories = data.site.siteMetadata.categories;
    const categoryObject = categories.find((cat) => {
      return cat.slug === categorySlug;
    });
    // use slug when name doesn't exist
    const categoryName = categoryObject ? categoryObject.name : categorySlug;

    return (
      <Layout location={this.props.location} title={categoryName}>
        <SEO title={categoryName} />
        <CategoryJsonLd
          categorySlug={categorySlug}
          categoryName={categoryName}
        />
        <CategoryMenu location={location} categories={categories} />
        <Heading>{categoryName}</Heading>
        {posts.map(({ node }) => {
          return <PostCard key={node.fields.slug} node={node} />;
        })}
      </Layout>
    );
  }
}

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
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY.MM.DD")
            title
            emoji
            category
          }
        }
      }
    }
  }
`;
