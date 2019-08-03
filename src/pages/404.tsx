import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

import svg404 from '../../static/images/svg/others/404.svg';
import { QueryResult } from '../models';

const Wrapper = styled.div`
  color: #fff;
  text-align: center;
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    margin-top: 2em;
  }
`;

const HeroImage = styled.img`
  display: block;
  max-width: 300px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 55px;
  font-weight: 700;
  color: #fff;
`;

const StyledLink = styled(Link)`
  margin-top: 0.7em;
  display: inline-block;
  padding: 0.3em 1em;
  background: #fff;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.blackLight};
  border-radius: 4px;
  &:hover {
    background: ${(props) => props.theme.colors.highlight};
  }
`;

interface Props {
  data: QueryResult;
  location: any;
}
class NotFoundPage extends React.Component<Props> {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Wrapper>
          <SEO title='앗! 길을 잘못 들었나봐요.' />
          <HeroImage src={svg404} />
          <Title>앗! 길을 잘못 들었나봐요.</Title>
          <StyledLink to={`/`} className='category-item__link'>
            HOME
          </StyledLink>
        </Wrapper>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
