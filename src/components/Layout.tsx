import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import Bio from './Bio';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import Header from './Header';

const Content = styled.div`
  margin-top: 2em;
  display: flex;
  min-height: 85vh;
  align-items: flex-start;
  @media screen and (max-width: ${(props) => props.theme.responsive.large}) {
    display: block;
  }
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    margin-top: 0;
  }
`;

const MainWrapper = styled.div`
  width: calc(100% - ${(props) => props.theme.sizes.bioWidth} - 40px);
  margin-right: 40px;
  @media screen and (max-width: ${(props) => props.theme.responsive.large}) {
    width: 100%;
  }
`;

interface Props {
  location: any;
  title: string;
  children: any;
}

class Layout extends React.Component<Props> {
  render() {
    const { location, title, children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div className="siteRoot">
          <Header title={title} location={location} />
          <ContentWrapper>
            <Content>
              <MainWrapper>
                <main>{children}</main>
              </MainWrapper>
              <Bio />
            </Content>
          </ContentWrapper>
          <Footer />
          <GlobalStyle />
        </div>
      </ThemeProvider>
    );
  }
}

export default Layout;
