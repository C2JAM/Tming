import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Container,
  CardSubtitle,
  UncontrolledAlert,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import wNumb from 'wnumb';

// RangeSlider
import Nouislider from 'nouislider-react';

import 'nouislider/distribute/nouislider.css';
import { LangProvider } from '../../components/Languages/languages';

class FormChartSet extends Component {
  constructor(props) {
    super(props);
    if (!window.localStorage.getItem('fontSizeMin')) {
      window.localStorage.setItem('fontSizeMin', 20);
    }
    if (!window.localStorage.getItem('fontSizeMax')) {
      window.localStorage.setItem('fontSizeMax', 50);
    }
    if (!window.localStorage.getItem('cycle')) {
      window.localStorage.setItem('cycle', 4);
    }

    this.state = {
      isFirst: window.localStorage.getItem('isFirst'),
      fontSize: [
        parseInt(window.localStorage.getItem('fontSizeMin')),
        parseInt(window.localStorage.getItem('fontSizeMax')),
      ],
      cycle: parseInt(window.localStorage.getItem('cycle')),
      chatCount: 15,
      nightMode: false,
      settingAlert: false,
      slotAlert: false,
    };
  }

  changeFontSize = (render, handle, value, un, percent) => {
    this.setState({
      fontSize: value.map((item, index) => {
        return parseInt(item);
      }),
    });
    this.handleSubmit();
  };

  changeCycle = (render, handle, value, un, percent) => {
    this.setState({
      cycle: parseInt(value[0]),
    });
    this.handleSubmit();
  };

  handleSubmit = () => {
    this.props.socket.emit('change-wordcloud-option', {
      data: this.state,
    });
    window.gtag('event', 'applyOption');
  };

  componentWillUnmount = () => {
    window.localStorage.setItem('fontSizeMin', this.state.fontSize[0]);
    window.localStorage.setItem('fontSizeMax', this.state.fontSize[1]);
    window.localStorage.setItem('cycle', this.state.cycle);
  };

  render() {
    return (
      <>
        <Container>
          <UncontrolledAlert
            color="info"
            className="alert-dismissible fade show"
            role="alert"
          >
            <i className="mdi mdi-alert-circle-outline mr-2"></i>
            <LangProvider LangKey="if_dont_work" />
            <i className="fas fa-sync"></i>
          </UncontrolledAlert>
          <Card className="vote-forms-frame">
            <CardBody>
              <CardBody>
                <CardTitle>
                  <LangProvider LangKey="wordcloudform_title" />
                </CardTitle>
              </CardBody>

              <div>
                <Nouislider
                  style={{ margin: '17px' }}
                  range={{ min: 10, max: 200 }}
                  tooltips={[
                    wNumb({ decimals: 0, prefix: 'px ' }),
                    wNumb({ decimals: 0, prefix: 'px ' }),
                  ]}
                  start={[
                    parseInt(window.localStorage.getItem('fontSizeMin')),
                    parseInt(window.localStorage.getItem('fontSizeMax')),
                  ]}
                  step={1}
                  onUpdate={this.changeFontSize}
                  connect
                />
                <CardSubtitle
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className="mb-3"
                >
                  <LangProvider LangKey="wordcloudform_setting1" />
                </CardSubtitle>
              </div>

              <div style={{ marginTop: '70px' }}>
                <Nouislider
                  style={{ margin: '17px' }}
                  range={{ min: 2, max: 8 }}
                  tooltips={[wNumb({ decimals: 0 })]}
                  start={[parseInt(window.localStorage.getItem('cycle'))]}
                  step={1}
                  onUpdate={this.changeCycle}
                />
                <CardSubtitle
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className="mb-3"
                >
                  <LangProvider LangKey="wordcloudform_setting2" />
                </CardSubtitle>
              </div>
              <div className="flex-box">
                {/* 슬롯 적용 및 완료하면 뜨는 Alert */}
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.slotAlert();
                    this.props.socket.emit('slot_url', {
                      url: 'http://127.0.0.1:5000/wordcloudoverlay',
                    });
                    window.gtag('event', 'applyWordCloud');
                  }}
                >
                  <LangProvider LangKey="wordcloudform_apply_slot" />
                </Button>

                <div>
                  <div
                    className="square-switch"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <div style={{ padding: '5px' }}>
                      <LangProvider LangKey={'backgroundColor'} />
                    </div>
                    <input
                      type="checkbox"
                      id="square-switch1"
                      switch="default"
                      checked={this.state.sq1}
                      onChange={() => {
                        this.handleSubmit();
                        this.setState({ nightMode: !this.state.nightMode });
                      }}
                    />
                    <label
                      htmlFor="square-switch1"
                      data-on-label="on"
                      data-off-label="off"
                    ></label>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
        {this.state.isVoteStart === 'yes' ? <Redirect to="vote" /> : null}
      </>
    );
  }
}

export default FormChartSet;
