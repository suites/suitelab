import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { QueryResult } from "../../models";

interface Props {
  categorySlug: string;
  categoryName: string;
}

const CategoryJsonLD = ({ categorySlug, categoryName }: Props) => {
  const data: QueryResult = useStaticQuery(jsonLdCategoryQuery);
  const { siteUrl } = data.site.siteMetadata;
  const jsonBreadCrumbs = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": siteUrl,
          name: "HOME",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${siteUrl}/${categorySlug}`,
          name: categoryName,
        },
      },
    ],
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonBreadCrumbs)}
    </script>
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
