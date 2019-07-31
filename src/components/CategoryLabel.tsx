import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { QueryResult } from '../models';

const Wrapper = styled.div`
  .category-text {
    padding: 0.3em 1em;
    display: inline-block;
    display: inline;
    padding: 3px 6px;
    line-height: 1.2;
    font-size: 12px;
    border-radius: 2px;
    font-weight: 700;
    color: #fff;
    @media screen and (max-width: ${(props) => props.theme.responsive.large}) {
      font-size: 11px;
      padding: 2.5px 6px;
    }
  }
`;

interface Props {
  slug: string;
  isLink?: boolean;
}

const CategoryLabel = ({ slug, isLink }: Props) => {
  return (
    <StaticQuery
      query={categoryQuery}
      render={(data: QueryResult) => {
        const { categories } = data.site.siteMetadata;
        const categoryObject = categories.find((cat) => {
          return cat.slug === slug;
        });
        const categoryName = categoryObject ? categoryObject.name : slug;
        const categoryColor = categoryObject ? categoryObject.color : '#6d4bf5';
        const content = isLink ? (
          <Link
            to={`/category/${slug}`}
            className='category-text'
            style={{
              background: categoryColor,
            }}
          >
            {categoryName}
          </Link>
        ) : (
            <span
              className='category-text'
              style={{
                background: categoryColor,
              }}
            >
              {categoryName}
            </span>
          );
        return <Wrapper>{content}</Wrapper>;
      }}
    />
  );
};

const categoryQuery = graphql`
  query categoryQuery {
    site {
      siteMetadata {
        categories {
          name
          slug
          color
        }
      }
    }
  }
`;

export default CategoryLabel;
