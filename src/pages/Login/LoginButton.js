import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { LangProvider } from '../../components/Languages/languages';
import Loader from 'react-loader-spinner';

const boxAnim = keyframes`
    0% {
      -webkit-box-shadow: 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735;
              box-shadow: 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735, 0 0 #212735;
      -webkit-transform: translateX(0) translateY(0);
              transform: translateX(0) translateY(0);
    }
    100% {
      -webkit-box-shadow: 1px -1px #212735, 2px -2px #212735, 3px -3px #212735, 4px -4px #212735, 5px -5px #212735, 6px -6px #212735, 7px -7px #212735, 8px -8px #212735;
              box-shadow: 1px -1px #212735, 2px -2px #212735, 3px -3px #212735, 4px -4px #212735, 5px -5px #212735, 6px -6px #212735, 7px -7px #212735, 8px -8px #212735;
      -webkit-transform: translateX(-8px) translateY(8px);
              transform: translateX(-8px) translateY(8px);
    }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 35px;
  background-color: ${props => props.theme.main_color};
  color: white;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    color: white;
    animation: ${boxAnim} 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  }
`;

class LoginButton extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleClick = () => {
    this.props.handleClick();
    this.setState({ loading: true });
  };

  render() {
    return (
      <>
        <Wrapper>
          <Button onClick={this.handleClick} href="/home">
            {this.state.loading ? (
              <div className="loaderWrapper">
                <Loader type="TailSpin" color="#fff" height={25} width={25} />
              </div>
            ) : (
              <LangProvider LangKey="login_twitch" />
            )}
          </Button>
        </Wrapper>
      </>
    );
  }
}

export default LoginButton;
