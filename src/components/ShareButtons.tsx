import React from 'react';
import styled from 'styled-components';
import svgTwitterWhite from '../../static/images/svg/socials/twitter-white.svg';

const Wrapper = styled.div`
  margin: 0 0 2.5em;
  padding: 0 ${(props) => props.theme.sideSpace.contentLarge};
  text-align: center;
  color: ${(props) => props.theme.colors.blackLight};
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    padding: 0 ${(props) => props.theme.sideSpace.contentSmall};
  }
`;

const ShareTitle = styled.div`
  font-weight: 700;
  font-size: 1.2em;
  letter-spacing: 0.05em;
`;

const ShareLinks = styled.div`
  margin-top: 0.5em;
`;

const ShareLink = styled.a`
  display: inline-block;
  margin: 0 6px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #fff;
  background: ${(props) => props.theme.colors.blackLight};
  font-weight: 700;
  vertical-align: middle;
  &:hover {
    transform: translateY(-2px);
  }
`;
const GitHubLink = styled.a`
  display: inline-block;
  margin-top: 1em;
  font-size: 0.85em;
  color: ${(props) => props.theme.colors.silver};
`;

interface Props {
  slug: string;
  title: string;
  emoji: string;
}

const ShareButtons = ({ slug, title, emoji }: Props) => {
  const encodedTitle = encodeURIComponent(
    `${emoji || '🐱'}${title} | suite.lab`,
  );
  const pageUrl = `https://suitee.me${slug}`;
  return (
    <Wrapper>
      <ShareTitle>SHARE</ShareTitle>
      <ShareLinks>
        <ShareLink
          href={`https://twitter.com/share?url=${pageUrl}&text=${encodedTitle}&via=yoon.homme`}
          rel="nofllow"
        >
          <img
            src={svgTwitterWhite}
            alt="Twitter"
            style={{
              width: '24px',
              height: '19px',
              marginTop: '11px',
            }}
          />
        </ShareLink>
        <ShareLink
          href={`https://www.facebook.com/share.php?u=${pageUrl}`}
          style={{ fontSize: '20px' }}
          rel="nofllow"
        >
          f
        </ShareLink>
      </ShareLinks>
    </Wrapper>
  );
};

export default ShareButtons;
