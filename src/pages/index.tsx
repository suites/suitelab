import { graphql, HeadProps, PageProps } from 'gatsby';
import React from 'react';

import CategoryMenu from '../components/CategoryMenu';
import HomeJsonLd from '../components/json/HomeJsonLd';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { useLocation } from '@reach/router';

const BlogIndex = ({
  data: { allMdx, site },
}: PageProps<Queries.AllBlogPostQuery>) => {
  const categories = site!.siteMetadata!.categories;
  const siteTitle = site!.siteMetadata!.title;
  const posts = allMdx.nodes;
  const location = useLocation();

  return (
    <Layout location={location} title={siteTitle!}>
      <CategoryMenu
        location={location}
        categories={categories!.map((it) => {
          return {
            color: it!.color!,
            icon: it!.icon!,
            link: it!.link!,
            name: it!.name!,
            slug: it!.slug!,
          };
        })}
      />
      {posts.map(({ frontmatter }) => {
        return (
          <PostCard
            key={frontmatter!.slug}
            frontmatter={{
              category: frontmatter!.category,
              date: frontmatter!.date,
              description: frontmatter!.description,
              emoji: frontmatter!.emoji,
              slug: frontmatter!.slug,
              title: frontmatter!.title,
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

export const Head = ({
  data: { site },
}: HeadProps<Queries.AllBlogPostQuery>) => {
  const description = site!.siteMetadata!.description!;
  const title = site!.siteMetadata!.title!;

  return (
    <SEO title={title} description={description}>
      <HomeJsonLd />
    </SEO>
  );
};
