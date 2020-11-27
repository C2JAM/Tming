import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border-right: #222831 3px solid;
  display: grid;
  grid-template:
    'top' 100px
    '.' 1fr
    / 1fr;

  .top {
    padding: 20px;
  }
`;

function VotedUsers() {
  return (
    <>
      <Wrapper>
        <div className="top">투표 참여자 : </div>
        <div>밑</div>
      </Wrapper>
    </>
  );
}

export default VotedUsers;
