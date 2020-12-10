import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Line } from 'rc-progress';

import { LangProvider, convert } from '../../components/Languages/languages';

const Grid = styled.div`
  color: #393e46;
  background-color: #393e46;
  padding: 20px;
  display: grid;
  grid-template:
    'copy copy' 60px
    'bottom bottom' 1fr
    /1fr 1fr;
  grid-gap: 10px;

  .slot {
    grid-area: copy;
    color: black;
    background-color: #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.2rem;

    .slot__address {
      textarea {
        display: flex;
        resize: none;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: 16px;
        &:focus {
          outline: none;
        }
      }
    }

    .slot__copy {
      width: 140px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffd369;
      border: none;

      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .bottom {
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .vote-item {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    height: 50px;
    background-color: #eeeeee;
    gap: 15px;

    &:focus-within {
      background-color: #ffd369;
    }

    .vote-item__status {
      .vote-item__name {
        font-size: 20px;
      }

      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 10px;
      width: 100%;
      height: 100%;
    }

    .vote-item__number {
      display: flex;
      justify-content: center;
      width: 20px;
      font-weight: 600;
      font-size: 28px;
    }

    input {
      display: flex;
      height: 100%;
      width: 100%;
      background-color: transparent;
      border: none;
      font-size: 20px;
      align-items: center;

      &:focus {
        outline: none;
      }
    }

    i {
      font-size: 20px;
      color: #ab0e23;

      &:hover {
        opacity: 0.8;
        cursor: pointer;
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
  const [address, setAddress] = useState('https://tming.live/slot/vote');
  const [voteItems, setVoteItems] = useState(['']);
  const [series, setSeries] = useState([0]);

  const [isVoting, setIsVoting] = useState(false);

  const prevVoteItemsLength = usePrevious(voteItems.length);
  const inputRefs = useRef([]);

  useEffect(() => {
    const IntervalID = setInterval(() => {
      const newSeries = window.localStorage.getItem('series');
      const newIsVoting = window.localStorage.getItem('isVoting');

      if (newSeries) {
        setSeries(JSON.parse(newSeries));
      }

      if (newIsVoting === 'true') {
        setIsVoting(true);
      } else if (newIsVoting === 'false') {
        setIsVoting(false);
      }
    }, 500);

    return () => {
      clearInterval(IntervalID);
    };
  }, []);

  useEffect(() => {
    // 투표 항목이 증가했다면
    if (prevVoteItemsLength < voteItems.length) {
      const lastIndex = voteItems.length - 1;
      inputRefs.current[lastIndex].select();
    }
  }, [voteItems.length, prevVoteItemsLength]);

  function getPercent(idx) {
    const sum = series?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );

    if (series === null || sum === 0) return 0;
    return ((series[idx] * 100) / sum).toFixed(1);
  }

  function onChangeVoteItem(event) {
    const { id, value: newValue } = event.target;

    const newVoteItems = voteItems.map((value, index) => {
      if (index === parseInt(id, 10)) {
        return newValue;
      }
      return value;
    });

    window.localStorage.setItem('labels', JSON.stringify(newVoteItems));
    setVoteItems(newVoteItems);
    setAddress(
      `https://tming.live/slot/vote/${window.btoa(
        encodeURIComponent(JSON.stringify(newVoteItems)),
      )}`,
    );
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

  function onDeleteVoteItem(event) {
    const deleteIndex = event.target.parentNode.children[1].id;
    const count = event.target.parentNode.parentNode.children.length;
    if (count > 1) {
      const newVoteItems = voteItems.filter(
        (value, index) => index !== parseInt(deleteIndex, 10),
      );

      setVoteItems(newVoteItems);
    }
  }

  function onClickCopy(event) {
    const text = event.target.parentNode.children[0].children[0];

    text.select();
    document.execCommand('copy');

    text.setSelectionRange(0, 0);
  }

  return (
    <>
      <Grid IsVoting={isVoting}>
        <div className="slot">
          <div className="slot__address">
            <textarea spellCheck="false" value={address} />
          </div>
          <button type="button" onClick={onClickCopy} className="slot__copy">
            <LangProvider LangKey="copy_slot" />
          </button>
        </div>
        <div className="bottom">
          {isVoting
            ? voteItems.map((value, index) => {
                return (
                  <>
                    <div className="vote-item">
                      <div className="vote-item__number">{index + 1}</div>
                      <div className="vote-item__status">
                        <div className="vote-item__name">
                          {voteItems[index]}
                        </div>
                        <Line
                          percent={getPercent(index)}
                          strokeWidth="1.8"
                          strokeColor="#ffd369"
                          trailColor="#393e46"
                        />
                      </div>
                    </div>
                  </>
                );
              })
            : voteItems.map((value, index) => {
                return (
                  <div className="vote-item">
                    <div className="vote-item__number">{index + 1}</div>
                    <input
                      id={index}
                      value={voteItems[index]}
                      onChange={onChangeVoteItem}
                      onKeyUp={onEnterPress}
                      placeholder={convert()['new_item']}
                      ref={el => {
                        inputRefs.current[index] = el;
                      }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    <i className="fas fa-times" onClick={onDeleteVoteItem} />
                  </div>
                );
              })}
        </div>
      </Grid>
    </>
  );
}

VoteForm.propTypes = {};

export default connect(null, null)(VoteForm);
