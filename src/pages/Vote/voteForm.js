import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Line } from 'rc-progress';

// actions
import { startVote, endVote } from '../../store/actions';

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
    background-color: ${props =>
      props.IsVoting === 'true' ? 'gray' : '#ffd369'};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transition: all 100ms cubic-bezier(0.39, 0.5, 0.15, 1.36);

    &:hover {
      cursor: ${props =>
        props.IsVoting === 'true' ? 'not-allowed' : 'pointer'};
    }

    &:focus {
      outline: none;
    }
  }

  .end-button {
    grid-area: end;
    color: black;
    background-color: ${props =>
      props.IsVoting === 'true' ? '#ffd369' : 'gray'};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transition: all 100ms cubic-bezier(0.39, 0.5, 0.15, 1.36);

    &:hover {
      cursor: ${props =>
        props.IsVoting === 'true' ? 'pointer' : 'not-allowed'};
    }

    &:focus {
      outline: none;
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
  }
`;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function VoteForm({
  startVote: dispatchStartVote,
  endVote: dispatchEndVote,
  isVoting: IsVoting,
}) {
  const [voteItems, setVoteItems] = useState(
    JSON.parse(window.localStorage.getItem('labels')),
  );

  const [series, setSeries] = useState(
    JSON.parse(window.localStorage.getItem('series')),
  );

  const prevVoteItemsLength = usePrevious(voteItems.length);
  const inputRefs = useRef([]);

  useEffect(() => {
    const IntervalID = setInterval(() => {
      const newSeries = window.localStorage.getItem('series');

      if (newSeries) {
        setSeries(JSON.parse(newSeries));
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
    const sum = series.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );

    if (sum === 0) return 0;
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

  function onClickStartVote() {
    dispatchStartVote('true');
    window.localStorage.setItem('labels', JSON.stringify(voteItems));
    window.localStorage.setItem(
      'series',
      JSON.stringify(voteItems.map(() => 0)),
    );
    window.localStorage.setItem('votedUsers', JSON.stringify([]));
  }

  function onClickEndVote() {
    dispatchEndVote('false');
  }

  return (
    <>
      <Grid IsVoting={IsVoting}>
        <button
          type="button"
          onClick={onClickStartVote}
          className="start-button"
        >
          시작
        </button>
        <button onClick={onClickEndVote} type="button" className="end-button">
          마감
        </button>
        <div className="bottom">
          {IsVoting === 'true'
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

VoteForm.propTypes = {
  startVote: PropTypes.func.isRequired,
  endVote: PropTypes.func.isRequired,
  isVoting: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    isVoting: state.Layout.isVoting,
  };
};

const mapDispatchToProps = { startVote, endVote };

export default connect(mapStateToProps, mapDispatchToProps)(VoteForm);
