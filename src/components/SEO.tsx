import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { useLocation } from "@reach/router";
import { QueryResult } from "../models";

interface Props {
  description?: string;
  lang?: any;
  meta?: any;
  title: string;
}
const SEO = ({ description, lang, meta, title }: Props) => {
  const { pathname } = useLocation();
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data: QueryResult) => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        const defaultTitle = "suite.lab | 윤옴므의 기술블로그";
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            defaultTitle={defaultTitle}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                property: `og:url`,
                content: `${data.site.siteMetadata.siteUrl}${pathname}`,
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title || defaultTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:image`,
                content: `${data.site.siteMetadata.siteUrl}/images/ogp.png`,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `google-site-verification`,
                content: `88lff6Lu9mvm83qKi5gCz6QvnlyJzZnPjPQo7E7PdOw`,
              },
              {
                name: `facebook-domain-verification`,
                content: `gekvdoha59vae2xpx4it05kl6w4fx4`,
              },
            ].concat(meta)}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  lang: `ko`,
  meta: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
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
