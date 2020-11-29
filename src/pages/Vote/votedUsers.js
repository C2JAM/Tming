import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border-right: #222831 3px solid;
  display: grid;
  padding: 20px;
  grid-gap: 10px;
  grid-template:
    'top' 60px
    '.' 1fr
    / 1fr;

  .top {
    background-color: #ffd369;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #222831;
  }
`;

const VotedUser = styled.div`
  background-color: #eeeeee;
  color: #222831;
  font-size: 18px;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

function VotedUsers() {
  const [votedUsers, setvotedUsers] = useState(
    JSON.parse(window.localStorage.getItem('votedUsers')),
  );

  useEffect(() => {
    function onChangeVotedUsers() {
      const newVotedUsers = JSON.parse(
        window.localStorage.getItem('votedUsers'),
      );

      setvotedUsers(newVotedUsers);
    }

    const IntervalId = setInterval(onChangeVotedUsers, 1000);

    return () => {
      clearInterval(IntervalId);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <div className="top">투표 참여자 : {votedUsers.length}</div>
        <div>
          {votedUsers.map(value => {
            return <VotedUser>{value.userName}</VotedUser>;
          })}
        </div>
      </Wrapper>
    </>
  );
}

export default VotedUsers;
