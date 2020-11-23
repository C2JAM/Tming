import React, { Component } from 'react';
import Cookies from 'react-cookies';
import { Row, Button, Input, UncontrolledAlert } from 'reactstrap';
import { LangProvider } from '../../components/Languages/languages';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import semver from 'semver';

//SweetAlert
// import SweetAlert from "react-bootstrap-sweetalert";
class LoginStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      imageURL: '',
      alertExistNewVersion: false,
      downloadURL: 'https://github.com/ccjam/tming-web/releases',
      lang: window.localStorage.getItem('lang'),
    };
  }

  async componentDidMount() {
    const cookies = Cookies.loadAll();
    const { login, imageURL } = cookies;
    this.setState({
      login,
      imageURL,
    });
    setTimeout(async () => {
      await this.checkAppVersion();
    }, 2500);
  }

  checkAppVersion = async () => {
    // 현재 서버로부터 투표 진행상황을 전달받는다.
    // 전달받은 정보로 차트를 설정한다. 앙

    const fetchedData = await fetch('https://tming.tv/api/checkUpdate');
    const jsonData = await fetchedData.json();
    this.setState({ downloadURL: jsonData.fileUrl });
    // console.log(localStorage.getItem('tmingVersion'),jsonData.version)
    // 버전 확인 (최신 버전이 아니면 최신버전 업데이트 권장 alert을 띄운다)
    var electronVersion = localStorage.getItem('tmingVersion');

    if (!electronVersion) electronVersion = '1.0.0';
    // null이면 1.0.0으로 바꿔주기
    if (semver.lt(electronVersion, jsonData.version)) {
      this.setState({ alertExistNewVersion: true });
    }
  };

  render() {
    const { imageURL, login } = this.state;
    return (
      <>
        <div className="login__wrapper">
          <Row className="login-status__title">
            <LangProvider LangKey="my_activity" />
          </Row>
          <div>&nbsp;</div>

          {this.state.alertExistNewVersion ? (
            <UncontrolledAlert
              color="info"
              className="alert-dismissible fade show"
              role="alert"
            >
              <i className="mdi mdi-alert-circle-outline mr-2"></i>
              <a
                onClick={() => {
                  window.gtag('event', 'updateVersion');
                  window.open(
                    `${this.state.downloadURL}`,
                    'PopupWin',
                    'width=3000,height=3000',
                  );
                }}
              >
                <LangProvider LangKey="update_alert" />
              </a>
            </UncontrolledAlert>
          ) : null}
          <div className="login-status__wrapper">
            <div className="login-status">
              <div className="status">
                <div className="status__profile">
                  <a href={`https://www.twitch.tv/${login}`} target="__blank">
                    <img src={imageURL} alt="" />
                  </a>
                </div>
                <div className="status__login">
                  <a
                    className="status__login-id"
                    href={`https://www.twitch.tv/${login}`}
                    target="__blank"
                  >
                    {login}
                  </a>
                </div>
              </div>
              <div>
                <div>
                  <div>&nbsp;</div>
                  <span className="slot-link">
                    <LangProvider LangKey="slot_copy" />
                  </span>
                  <CopyToClipboard
                    text={'http://127.0.0.1:5000/slot'}
                    onCopy={() => {
                      this.props.copyAlert();
                      window.gtag('event', 'copySlotUrl');
                    }}
                  >
                    <span>
                      <Input
                        id="slot-link-url"
                        type="text"
                        value="http://127.0.0.1:5000/slot"
                        disabled
                      />
                    </span>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginStatus;
