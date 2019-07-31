import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import CategoryMenu from '../components/CategoryMenu';
import HomeJsonLd from '../components/json/HomeJsonLd';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { QueryResult } from '../models';

interface Props {
  data: QueryResult;
  location: any;
}
class BlogIndex extends React.Component<Props> {
  render() {
    const { data } = this.props;
    const categories = data.site.siteMetadata.categories;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const { location } = this.props;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title='' />
        <Helmet>
          <link rel='canonical' href='https://suitee.me' />
        </Helmet>
        <HomeJsonLd />
        <CategoryMenu location={location} categories={categories} />
        {posts.map(({ node }) => {
          return <PostCard key={node.fields.slug} node={node} />;
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        categories {
          name
          icon
          link
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
