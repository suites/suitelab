import { graphql, PageProps, HeadProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import CategoryLabel from '../components/CategoryLabel';
import FollowBudge from '../components/FollowBadge';
import PostJsonLd from '../components/json/PostJsonLd';
import Layout from '../components/Layout';
import RelatedPosts from '../components/RelatedPosts';
import ShareButtons from '../components/ShareButtons';

import postContentStyle from '../styles/postContent';
import postCustomBlockStyle from '../styles/postCustomBlock';
import postSyntaxHighlightStyle from '../styles/postSyntaxHighlight';

import svgPattern from '../../static/images/svg/others/pattern.svg';

import { Disqus } from 'gatsby-plugin-disqus';
import { PostPageContext } from '../models';

import 'katex/dist/katex.min.css';
import { twemojiParse } from '../utils/twemoji.util';
import SEO from '../components/SEO';
import { useLocation } from '@reach/router';

const Content = styled.section`
  position: relative;
  background: #fff;
  overflow: hidden;
  font-size: 16px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    z-index: 5;
  }
  &:before {
    top: 0;
    left: 0;
    border-top: 20px solid ${(props) => props.theme.colors.background};
    border-right: 20px solid transparent;
  }
  &:after {
    bottom: 0;
    right: 0;
    border-bottom: 20px solid ${(props) => props.theme.colors.background};
    border-left: 20px solid transparent;
  }
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    margin: 0 -${(props) => props.theme.sideSpace.small};
    &:before,
    &:after {
      content: none;
    }
  }
`;

const HeroImage = styled.p`
  position: relative;
  background: ${(props) => props.theme.colors.blackLight};
  text-align: center;
  background-image: url('${svgPattern}');
  background-repeat: repeat;
  background-size: 400px;
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  .emoji {
    width: 110px;
    height: 110px;
  }
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    min-height: 190px;
  }
`;

const ContentMain = styled.div`
  padding: 1.8em ${(props) => props.theme.sideSpace.contentLarge};
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    padding: 30px ${(props) => props.theme.sideSpace.contentSmall};
  }
`;

const PostTitle = styled.h1`
  margin: 0.1em 0 0.3em;
  font-size: 1.8em;
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    font-size: 25px;
  }
  font-weight: 700;
  line-height: 1.5;
`;

const PostDate = styled.time`
  display: block;
  color: ${(props) => props.theme.colors.silver};
  font-size: 0.9em;
  letter-spacing: 0.05em;
`;

const PostContent = styled.div`
  ${postSyntaxHighlightStyle}
  ${postContentStyle}
  ${postCustomBlockStyle}
`;

const BlogPostTemplate = ({
  data,
  children,
}: PageProps<Queries.BlogPostByIdQuery, PostPageContext>) => {
  const { site, mdx, allMdx } = data;
  const { siteUrl, title: siteTitle } = site!.siteMetadata!;
  const { title, date, category, emoji, slug } = mdx!.frontmatter!;
  const location = useLocation();
  const locationFullUrl = `${siteUrl + location.pathname}`;

  const disqusConfig = {
    url: locationFullUrl,
    identifier: mdx!.id,
    title,
  };

  const relatedPosts = () => {
    return allMdx.nodes
      .filter((node) => node.frontmatter!.slug !== slug)
      .filter((node) => node.frontmatter!.category === category)
      .slice(0, 5)
      .map((node) => {
        return {
          category: node.frontmatter!.category,
          date: node.frontmatter!.category,
          description: '',
          emoji: node.frontmatter!.emoji,
          slug: node.frontmatter!.slug,
          title: node.frontmatter!.title,
        };
      });
  };

  return (
    <Layout location={location} title={siteTitle!}>
      <Content>
        <HeroImage
          dangerouslySetInnerHTML={{
            __html: twemojiParse(emoji || '😺'),
          }}
        />
        <ContentMain>
          <PostDate>{date}</PostDate>
          <PostTitle>{title}</PostTitle>
          <CategoryLabel slug={category!} isLink={true} />
          <PostContent>{children}</PostContent>
          <FollowBudge />
        </ContentMain>
        <aside>
          <ShareButtons slug={slug!} title={title!} emoji={emoji!} />
          <Disqus config={disqusConfig} />
          <RelatedPosts posts={relatedPosts()} />
        </aside>
      </Content>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById($id: String) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        description
        date(formatString: "YYYY.MM.DD")
        emoji
        category
        slug
      }
    }
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
`;

export const Head = ({
  data: { site, mdx },
}: HeadProps<Queries.BlogPostByIdQuery, PostPageContext>) => {
  const { siteUrl } = site!.siteMetadata!;
  const { title, description, date, category } = mdx!.frontmatter!;
  const location = useLocation();
  const locationFullUrl = `${siteUrl + location.pathname}`;

  return (
    <SEO title={title!} description={description! || mdx!.excerpt!}>
      <link rel="canonical" href={locationFullUrl} />
      <PostJsonLd
        title={title!}
        description={description! || mdx!.excerpt!}
        date={date!}
        url={location.href}
        categorySlug={category!}
      />
    </SEO>
  );
};
