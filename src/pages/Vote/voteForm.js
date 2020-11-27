import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  color: #393e46;
  background-color: #393e46;
  padding: 20px;
  display: grid;
  grid-template:
    'start end' 60px
    'bottom bottom' 1fr
    /1fr 1fr;
  grid-gap: 10px;

  .start-button {
    grid-area: start;
    color: black;
    background-color: #ffd369;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .end-button {
    grid-area: end;
    color: black;
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom {
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .vote-item {
    padding: 5px 15px;
    height: 50px;
    align-items: center;
    display: flex;
    background-color: #eeeeee;
    gap: 15px;

    &:focus-within {
      background-color: #ffd369;
    }

    .vote-item__number {
      display: flex;
      justify-content: center;
      width: 20px;
      font-weight: 600;
      font-size: 28px;
    }

    input {
      height: 100%;
      width: 100%;
      background-color: transparent;
      border: none;
      font-size: 20px;

      &:focus {
        outline: none;
      }
    }
  }
`;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function VoteForm() {
  const [voteItems, setVoteItems] = useState(['']);
  const prevVoteItemsLength = usePrevious(voteItems.length);
  const inputRefs = useRef([]);

  useEffect(() => {
    // 투표 항목이 증가했다면
    if (prevVoteItemsLength < voteItems.length) {
      const lastIndex = voteItems.length - 1;
      inputRefs.current[lastIndex].select();
    }
  }, [voteItems.length, prevVoteItemsLength]);

  function onChangeVoteItem(event) {
    const { id, value: newValue } = event.target;

    const newVoteItems = voteItems.map((value, index) => {
      if (index === parseInt(id, 10)) {
        return newValue;
      }
      return value;
    });
    setVoteItems(newVoteItems);
  }

  function onEnterPress(event) {
    const {
      key,
      target: { id },
    } = event;

    const lastIndex = voteItems.length - 1;

    // 엔터를 눌렀을 때
    if (key === 'Enter') {
      if (voteItems[lastIndex] !== '' && lastIndex === parseInt(id, 10)) {
        setVoteItems([...voteItems, '']);
      }

      if (lastIndex !== parseInt(id, 10)) {
        inputRefs.current[parseInt(id, 10) + 1].select();
      }
    }
  }

  return (
    <>
      <Grid>
        <div className="start-button">시작</div>
        <div className="end-button">마감</div>
        <div className="bottom">
          {voteItems.map((value, index) => {
            return (
              <div className="vote-item">
                <div className="vote-item__number">{index + 1}</div>
                <input
                  id={index}
                  value={voteItems[index]}
                  onChange={onChangeVoteItem}
                  onKeyUp={onEnterPress}
                  placeholder="새 항목 입력"
                  ref={el => {
                    inputRefs.current[index] = el;
                  }}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            );
          })}
        </div>
      </Grid>
    </>
  );
}

export default VoteForm;
