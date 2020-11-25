import React from 'react';
import Cookies from 'react-cookies';
import tmi from 'tmi.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: Cookies.load('login'),
      convo: [],
    };
  }

  componentDidMount() {
    const { login } = this.state;
    this.client = new tmi.Client({ channels: [`${login}`] });

    this.client.on('message', this.onMessageHandler);

    this.client.connect();
  }

  componentWillUnmount() {
    this.client.disconnect();
  }

  onMessageHandler = (target, context, msg, self) => {
    if (self) return;
    const { username, color } = context;
    const display = context['display-name'];
    const text = {
      message: msg,
      username,
      display,
      color,
    };

    this.setState(
      {
        convo: [...this.state.convo, text],
      },
      () => {
        this.scrollToBottom();
      },
    );
  };

  scrollToBottom = () => {
    const shouldScrollBottom =
      this.container.scrollHeight - this.container.scrollTop > 1000
        ? false
        : true;

    if (shouldScrollBottom) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  };

  singleMessage(props)) {
    const { display, username, message, color } = props;

    return (
      <div className="user-chat">
        <span className="user-chat__login">
          <span
            className="user-chat__login__display"
            style={color === null ? null : { color: `${color}` }}
          >
            {display}
          </span>
          ({username})
        </span>
        <span className="divider"> : </span>
        <span className="user-chat__msg">{message}</span>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="chat-wrapper">
          {/* <div className="chat-layout__title">트위치 채팅창</div> */}
          <div className="chat-layout">
            <div id="chat-box" ref={el => (this.container = el)}>
              {this.state.convo.map(value => this.singleMessage(value))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
