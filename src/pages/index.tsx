import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import CategoryMenu from '../components/CategoryMenu';
import HomeJsonLd from '../components/json/HomeJsonLd';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';

interface Props {
  data: Queries.AllBlogPostQuery;
  location: any;
}

const BlogIndex = (props: Props) => {
  const { allMdx, site } = props.data;
  const categories = site!!.siteMetadata!!.categories;
  const siteTitle = site!!.siteMetadata!!.title;
  const siteDescription = site!!.siteMetadata!!.description;
  const posts = allMdx.nodes;
  return (
    <Layout location={props.location} title={siteTitle!!}>
      <SEO title={siteTitle!!} description={siteDescription!!} />
      <Helmet>
        <link rel="canonical" href="https://suitee.me" />
      </Helmet>
      <HomeJsonLd />
      <CategoryMenu
        location={props.location}
        categories={categories!!.map((it) => {
          return {
            color: it!!.color!!,
            icon: it!!.icon!!,
            link: it!!.link!!,
            name: it!!.name!!,
            slug: it!!.slug!!,
          };
        })}
      />
      {posts.map(({ frontmatter }) => {
        console.log(JSON.stringify(posts, null, 2));
        return (
          <PostCard
            key={frontmatter!!.slug}
            frontmatter={{
              category: frontmatter!!.category,
              date: frontmatter!!.date,
              description: frontmatter!!.description,
              emoji: frontmatter!!.emoji,
              slug: frontmatter!!.slug,
              title: frontmatter!!.title,
            }}
          />
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query AllBlogPost {
    site {
      siteMetadata {
        title
        description
        categories {
          name
          icon
          link
          color
          slug
        }
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          slug
          date(formatString: "YYYY.MM.DD")
          title
          emoji
          category
          description
        }
        id
      }
    }
  }
`;
