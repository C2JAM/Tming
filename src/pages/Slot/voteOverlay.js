import React, { useEffect, useState } from 'react';
import tmi from 'tmi.js';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { startVote, endVote } from '../../store/actions';

function VoteOverlay({
  startVote: dispatchStartVote,
  endVote: dispatchEndVote,
}) {
  const [series, setSeries] = useState(
    JSON.parse(window.localStorage.getItem('labels')).map(() => 0),
  );

  const [labels] = useState(JSON.parse(window.localStorage.getItem('labels')));

  // {userName: {string}, votedIndex: {number}}
  const [votedUsers, setVotedUsers] = useState([]);

  useEffect(() => {
    function vote(tags, message) {
      const msgArr = message.split(' ');
      const { username: userName } = tags;

      if (msgArr[0] !== '!vote' && msgArr[0] !== '!투표') return;
      if (Number.isNaN(parseInt(msgArr[1], 10))) return;

      const votedIndex = parseInt(msgArr[1], 10) - 1;

      let newSeries = series.map((value, index) => {
        if (index === votedIndex) {
          return value + 1;
        }
        return value;
      });

      const votedUser = votedUsers.find(value => value.userName === userName);

      if (votedUser) {
        newSeries = newSeries.map((value, index) => {
          if (index === votedUser.votedIndex) {
            return value - 1;
          }
          return value;
        });
      }

      const newVotedUsers = votedUsers.filter(
        value => value.userName !== userName,
      );

      newVotedUsers.push({ userName, votedIndex });

      setSeries(newSeries);
      setVotedUsers(newVotedUsers);
    }

    async function connectToTwitchChat(newTwitchChat) {
      const twitchId = window.localStorage.getItem('twitchId');

      await newTwitchChat.connect().catch(err => console.warn(err));
      await newTwitchChat.join(twitchId);

      newTwitchChat.on('message', (channel, tags, message, self) => {
        if (self) return;
        // Vote
        if (window.localStorage.getItem('isVoting') === 'true') {
          vote(tags, message);
        }
      });
    }

    const newTwitchChat = new tmi.Client({
      connection: {
        reconnect: true,
        secure: true,
      },
    });

    connectToTwitchChat(newTwitchChat);
    dispatchStartVote('true');

    window.addEventListener('beforeunload', () => {
      dispatchEndVote('false');
    });

    return () => {
      newTwitchChat.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatchEndVote('false');
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem('series', JSON.stringify(series));
  }, [series]);

  useEffect(() => {
    window.localStorage.setItem('votedUsers', JSON.stringify(votedUsers));
  }, [votedUsers]);

  const options = {
    labels,
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const { seriesIndex } = opts;

        return `${seriesIndex + 1}. ${labels[seriesIndex]}`;
      },
    },
  };

  return (
    <div className="donut">
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>
  );
}

VoteOverlay.propTypes = {
  startVote: PropTypes.func.isRequired,
  endVote: PropTypes.func.isRequired,
};

const mapDispatchToProps = { startVote, endVote };

export default connect(null, mapDispatchToProps)(VoteOverlay);
