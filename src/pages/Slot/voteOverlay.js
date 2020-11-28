import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tmi from 'tmi.js';

import { connectToTwitchChat } from '../../store/actions';

function VoteOverlay({ connectToTwitchChat: dispatchConnectToTwitchChat }) {
  useEffect(() => {
    const newTwitchChat = new tmi.Client({
      connection: {
        reconnect: true,
        secure: true,
      },
    });

    dispatchConnectToTwitchChat(newTwitchChat);

    return () => {
      newTwitchChat.disconnect();
    };
  }, [dispatchConnectToTwitchChat]);

  return <div>안녕?</div>;
}

VoteOverlay.propTypes = {
  connectToTwitchChat: PropTypes.func.isRequired,
};

const mapDispatchToProps = { connectToTwitchChat };

export default connect(null, mapDispatchToProps)(VoteOverlay);
