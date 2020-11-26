import React from 'react';
import styled from 'styled-components';

const RootGrid = styled.div`
  display: grid;
  grid-template:
    'voted-users vote-form chat' 100vh
    / 1fr 1fr 1fr;

  .voted-users {
    background-color: salmon;
    grid-area: voted-users;
  }

  .vote-form {
    background-color: yellow;
    grid-area: vote-form;
  }

  .chat {
    background-color: green;
    grid-area: chat;
  }
`;

function Index() {
  return (
    <>
      <RootGrid>
        <div className="voted-users" />
        <div className="vote-form" />
        <div className="chat" />
      </RootGrid>
    </>
  );
}

export default Index;
