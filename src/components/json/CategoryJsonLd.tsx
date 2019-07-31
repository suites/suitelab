import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { QueryResult } from '../../models';

interface Props {
  categorySlug: string;
  categoryName: string;
}

const CategoryJsonLD = ({ categorySlug, categoryName }: Props) => {
  return (
    <StaticQuery
      query={jsonLdCategoryQuery}
      render={(data: QueryResult) => {
        const { siteUrl } = data.site.siteMetadata;
        // bread crumbs
        const jsonBreadCrumbs = {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'item': {
                '@id': siteUrl,
                'name': 'HOME',
              },
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'item': {
                '@id': `${siteUrl}/${categorySlug}`,
                'name': categoryName,
              },
            },
          ],
        };
        return (
          <Helmet>
            <script type='application/ld+json'>
              {JSON.stringify(jsonBreadCrumbs)}
            </script>
          </Helmet>
        );
      }}
    />
  );
};

export default CategoryJsonLD;

const jsonLdCategoryQuery = graphql`
  query jsonLdCategoryQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
