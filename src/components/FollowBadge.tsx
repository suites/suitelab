import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

const Follow = styled.div`
  margin-top: 2em;
  text-align: left;
`;

const FollowLink = styled.a`
  display: inline-flex;
  align-items: center;
  background: #000;
  color: #fff;
  padding: 0;
  border-radius: 4px;
  overflow: hidden;
  .follow-link-text {
    padding: 5px 7px;
    background: #dfebf3;
    color: #445271;
    font-size: 14px;
    transition: 0.2s;
  }
  &:hover .follow-link-text {
    background: #d3ebfb;
  }
`;

const ShareButtons = () => {
  return (
    <Follow>
      <FollowLink href='https://github.com/suites'>
        <FaGithub size={32} />
        <div className='follow-link-text'>Follow to @yoon.homme</div>
      </FollowLink>
    </Follow>
  );
};

export default ShareButtons;
