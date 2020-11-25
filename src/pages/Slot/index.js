import React, { Component } from 'react';

class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '/slotready',
    };
  }

  componentDidMount() {
    this.props.socket.on('slot_url', data => {
      this.setState({
        url: '/slotready',
      });
      console.log('서버로부터 소켓 받음');
      this.setState({
        url: data.url,
      });
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <iframe
        title="myframe"
        src={this.state.url}
        style={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          border: 'none',
          scrolling: 'no',
        }}
      ></iframe>
    );
  }
}

export default Slot;
