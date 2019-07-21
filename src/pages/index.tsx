import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import CategoryMenu from '../components/CategoryMenu';
import HomeJsonLd from '../components/json/HomeJsonLd';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';

interface Props {
  data: any;
  location: any;
}
class BlogIndex extends React.Component<Props> {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const { location } = this.props;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title='' />
        <Helmet>
          <link rel='canonical' href='https://catnose99.com' />
        </Helmet>
        <HomeJsonLd />
        <CategoryMenu location={location} />
        {posts.map(({ node }: { node: any }) => {
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
