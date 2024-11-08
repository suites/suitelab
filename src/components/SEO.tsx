import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useLocation } from '@reach/router';
import { QueryResult } from '../models';

interface Props {
  description?: string;
  title: string;
  children?: any;
}
const SEO = ({ description, title, children }: Props) => {
  const { pathname } = useLocation();

  const {
    site: { siteMetadata },
  }: QueryResult = useStaticQuery(detailsQuery);
  const metaDescription = description || siteMetadata.description;
  const defaultTitle = 'suite.lab | 윤옴므의 기술블로그';

  return (
    <>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:url" content={`${siteMetadata.siteUrl}${pathname}`} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={`${siteMetadata.siteUrl}/images/ogp.png`}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="google-site-verification"
        content="88lff6Lu9mvm83qKi5gCz6QvnlyJzZnPjPQo7E7PdOw"
      />
      <meta
        name="facebook-domain-verification"
        content="gekvdoha59vae2xpx4it05kl6w4fx4"
      />
      <link rel="canonical" href="https://suitee.me" />
      {children}
    </>
  );
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
      }
    }
  }
`;
