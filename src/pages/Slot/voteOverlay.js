import React, { useEffect, useState } from 'react';
import tmi from 'tmi.js';
import Chart from 'react-apexcharts';

function VoteOverlay() {
  const [series, setSeries] = useState(
    JSON.parse(window.localStorage.getItem('series')),
  );
  const [labels] = useState(JSON.parse(window.localStorage.getItem('labels')));

  // {userName: {string}, votedIndex: {number}}
  const [votedUsers, setVotedUsers] = useState(
    JSON.parse(window.localStorage.getItem('votedUsers')),
  );

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

    function onChangeStorage(event) {
      if (event.key === 'isVoting' && event.newValue === 'true') {
        const newSeries = JSON.parse(window.localStorage.getItem('labels'));

        setSeries(
          newSeries.map(() => {
            return 0;
          }),
        );
        window.localStorage.setItem(
          'series',
          JSON.stringify(newSeries.map(() => 0)),
        );
      }
    }

    const newTwitchChat = new tmi.Client({
      connection: {
        reconnect: true,
        secure: true,
      },
    });

    connectToTwitchChat(newTwitchChat);
    window.addEventListener('storage', onChangeStorage);

    return () => {
      newTwitchChat.disconnect();
      window.removeEventListener('storage', onChangeStorage);
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

export default VoteOverlay;
