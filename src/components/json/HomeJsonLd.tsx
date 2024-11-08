import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { QueryResult } from '../../models';

const JsonLD = () => {
  const data: QueryResult = useStaticQuery(jsonLdHomeQuery);
  const { title, siteUrl, description, author } = data.site.siteMetadata;
  const publisher = {
    '@type': 'Organization',
    name: author,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/avatar.png`,
      width: 150,
      height: 150,
    },
  };

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/ogp.png`,
      height: 1200,
      width: 630,
    },
    url: siteUrl,
    name: title,
    author: {
      '@type': 'Person',
      name: author,
    },
    description: description,
    publisher,
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
};

export default JsonLD;

const jsonLdHomeQuery = graphql`
  query JsonLdHomeQuery {
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
