import React from 'react';
import styled from 'styled-components';
import ContentWrapper from './ContentWrapper';

const FooterContent = styled.footer`
  padding: 0.1em 0;
`;

const FooterInner = styled.div`
  margin-top: 3em;
  text-align: center;
  padding: 1.5em;
  border-top: solid 1px ${(props) => props.theme.colors.blackLight};
  color: ${(props) => props.theme.colors.gray};
  font-size: 14px;
  a {
    color: ${(props) => props.theme.colors.gray};
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContent>
      <ContentWrapper>
        <FooterInner>
          <div>© {new Date().getFullYear()}, yoon.homme All rights reserved.</div>
          <div>
            {'Theme by '}
            <a href='https://github.com/catnose99/CatKnows' rel='nofollow'>
              CatKnows
            </a>
          </div>
        </FooterInner>
      </ContentWrapper>
    </FooterContent>
  );
};

export default Footer;
