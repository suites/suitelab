import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import CategoryMenu from '../components/CategoryMenu';
import HomeJsonLd from '../components/json/HomeJsonLd';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { QueryResult } from '../models';

interface Props {
  data: Queries.AllBlogPostQuery;
  location: any;
}

export const Head = () => (
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8149191585003652"
     crossorigin="anonymous"></script>
)

const BlogIndex = (props: Props) => {
  const { allMdx, site } = props.data;
  const categories = site!!.siteMetadata!!.categories;
  const siteTitle = site!!.siteMetadata!!.title;
  const posts = allMdx.nodes;
  return (
    <Layout location={props.location} title={siteTitle!!}>
      <SEO title='' />
      <Helmet>
        <link rel='canonical' href='https://suitee.me' />
      </Helmet>
      <HomeJsonLd />
      <CategoryMenu location={props.location} categories={categories!!.map((it) => {
        return {
          color: it!!.color!!,
          icon: it!!.icon!!,
          link: it!!.link!!,
          name: it!!.name!!,
          slug: it!!.slug!!
        }
      })} />
      {posts.map(({ frontmatter }) => {
        return <PostCard key={frontmatter!!.slug} frontmatter={{
          category: frontmatter!!.category,
          date: frontmatter!!.date,
          description: frontmatter!!.description,
          emoji: frontmatter!!.emoji,
          slug: frontmatter!!.slug,
          title: frontmatter!!.title
        }} />;
      })}
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query AllBlogPost {
      site {
        siteMetadata {
          title
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