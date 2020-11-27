import { nanoid } from 'nanoid';
import React from 'react';
import styled from 'styled-components';

// sub components
import VoteForm from './voteForm';
import VotedUsers from './votedUsers';

const RootGrid = styled.div`
  display: grid;
  grid-template:
    'users form chat' minmax(90vh, 1fr)
    / 1fr 1.5fr 1fr;

  .voted-users {
    grid-area: users;
  }

  .vote-form {
    grid-area: form;
  }

  .chat {
    grid-area: chat;
  }
`;

function Index() {
  return (
    <>
      <RootGrid>
        <div className="voted-users">
          <VotedUsers />
        </div>
        <div className="vote-form">
          <VoteForm />
        </div>
        <div className="chat">
          <iframe
            title={nanoid()}
            frameBorder="0"
            scrolling="no"
            src="https://www.twitch.tv/embed/luceinaltis2020/chat?parent=127.0.0.1&darkpopout"
            height="100%"
            width="100%"
          />
        </div>
      </RootGrid>
    </>
  );
}

export default Index;
