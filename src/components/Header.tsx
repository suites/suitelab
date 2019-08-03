import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import svgLogo from '../../static/images/svg/logo.svg';
import ContentWrapper from './ContentWrapper';

const HeaderTag = styled.header`
  background: #3B71DA;
  width: 100%;
  // border-bottom: solid 1px ${(props) => props.theme.colors.blackLight};
  box-shadow: 0 2px 4px rgba(0,0,0,.4);
`;

const HeaderInner = styled.div`
  position: relative;
  h1,
  h3 {
    width: 100%;
  }
  .logo {
    display: block;
    width: 200px;
    height: 60px;
    @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
      margin: 0 auto;
    }
  }

  .logo-link {
    display: block;
  }
  .message-link {
    position: absolute;
    right: 0;
    top: 7px;
    display: block;
    width: 34px;
    &:hover {
      top: 5px;
    }
  }
`;

interface Props {
  title: string;
  location: any;
}

const Header = ({ title, location }: Props) => {
  const rootPath = `${process.env.__PATH_PREFIX__}/`;
  const logoLink = (
    <Link to={`/`} className='logo-link'>
      <img className='logo' src={svgLogo} alt={title} />
    </Link>
  );

  let headerLogo;
  if (location.pathname === rootPath) {
    headerLogo = <h1>{logoLink}</h1>;
  } else {
    headerLogo = <h3>{logoLink}</h3>;
  }
  return (
    <HeaderTag>
      <ContentWrapper>
        <HeaderInner>{headerLogo}</HeaderInner>
      </ContentWrapper>
    </HeaderTag>
  );
};

export default Header;
