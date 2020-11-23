import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const VoteEnd = styled.div`
  font-size: 48px;
  font-weight: 500;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: white;
`;

class VoteOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVoting: false,
      title: '',
      seriesPie: [1],
      seriesBar: [
        {
          data: [0],
        },
      ],
      labels: ['ready for vote...'],
      chart_type: 'pie_1',
      chart_hidden: false,
      datalabels_number_type: true,
    };
  }

  currentVote = async () => {
    // 현재 서버로부터 투표 진행상황을 전달받는다.
    // 전달받은 정보로 차트를 설정한다. 앙

    const fetchedData = await fetch('/api/v1/vote/data');
    const jsonData = await fetchedData.json();

    const { vote_result, vote_list } = jsonData;
    if (this.state.chart_hidden === false) {
      this.setState({
        seriesPie: vote_result,
        seriesBar: [{ data: vote_result }],
      });
    } else {
      this.setState({
        seriesPie: [0],
        seriesBar: [{ data: [0] }],
        labels: ['hiden'],
      });
    }
  };

  startVote = async () => {
    // 현재 서버로부터 투표 진행상황을 전달받는다.
    // 전달받은 정보로 차트를 설정한다. 앙

    const fetchedData = await fetch('/api/v1/vote/data');
    const jsonData = await fetchedData.json();

    const { isVoting, title, vote_result, vote_list, chart_type } = jsonData;
    this.setState({
      isVoting: isVoting,
      title: title,
      seriesPie: vote_result,
      seriesBar: [{ data: vote_result }],
      labels: vote_list,
      chart_type: chart_type,
    });

    if (isVoting === true) {
      this.interval = setInterval(() => {
        this.currentVote();
      }, 1000);
    }
  };

  componentDidMount() {
    //웹소켓 핸들링 부분
    const body = document.querySelector('body');
    body.style.background = 'transparent';

    //투표 종료했을때
    this.startVote();

    //투표 시작했을때
    this.props.socket.on('express-to-client__start-vote', () => {
      console.log('투표시작 소켓!');
      this.startVote();
    });

    //투표 종료할때
    this.props.socket.on('express-to-client__end-vote', () => {
      console.log('투표종료소켓!');
      clearInterval(this.interval);
      this.setState({
        chart_type: 'voteEnd',
      });
    });

    //chage chart 옵션
    this.props.socket.on('vote-tooltip/change-chart', data => {
      console.log(data.chart_type, 'vote tooltip 소켓');
      this.setState({ chart_type: data.chart_type });
    });
    //hide chart 옵션
    this.props.socket.on('vote-tooltip/hide-chart', data => {
      this.setState({
        chart_hidden: data.chart_hidden,
      });
    });

    //data label 표기 타입
    this.props.socket.on('vote-tooltip/datalabel-type', data => {
      this.setState({
        datalabels_number_type: data.datalabels_number_type,
        seriesPie: [1],
        seriesBar: this.state.seriesBar,
      });
      console.log('투표 라벨', this.state);
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  templatePieOption = dataLabelsNumberType => {
    const tem = {
      labels: this.state.labels,
      colors: [
        '#AAAAF2',
        '#DFAAF2',
        '#F2AACF',
        '#7ea1e5',
        '#a87ee4',
        '#e57fd5',
        '#e57e89',
        '#5c52cc',
        '#2d4fb3',
      ],
      legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10,
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          if (dataLabelsNumberType) return seriesIndex + 1;
          else return w.config.labels[seriesIndex];
        },
        style: {
          fontSize: '2.5rem',
          // fontFamily: 'Nssoto Sans KR, Helvetica, Arial, sans-serif',
        },
      },
    };
    console.log(tem);
    return tem;
  };

  templateBarOption = dataLabelsNumberType => {
    var tem = {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom',
          },
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          fontSize: '3.5rem',
          fontFamily: 'Noto Sans KR, Helvetica, Arial, sans-serif',
          colors: ['#fff'],
        },
        formatter: function (val, opt) {
          if (dataLabelsNumberType) return opt.dataPointIndex + 1;
          else return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
        offsetX: 10,
        offsetY: 20,
        dropShadow: {
          enabled: true,
        },
      },
      legend: {
        show: false,
      },
      colors: [
        '#aaaaf2',
        '#dfaaf2',
        '#f2aacf',
        '#7ea1e5',
        '#a87ee4',
        '#e57fd5',
        '#e57e89',
        '#5c52cc',
        '#2d4fb3',
      ],
      grid: {
        borderColor: '#556ee6',
      },
      xaxis: {
        categories: this.state.labels,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    };
    return tem;
  };

  render() {
    return (
      <React.Fragment>
        <div className="full-screen-page" style={{ background: '' }}>
          {this.state.chart_type === 'pie_1' ? (
            <ReactApexChart
              options={this.templatePieOption(
                this.state.datalabels_number_type,
              )}
              series={this.state.seriesPie}
              type="pie"
              height="85%"
            />
          ) : null}
          {this.state.chart_type === 'bar_1' ? (
            <ReactApexChart
              options={this.templateBarOption(
                this.state.datalabels_number_type,
              )}
              series={this.state.seriesBar}
              type="bar"
              height="85%"
            />
          ) : null}
          {this.state.chart_type === 'voteEnd' ? (
            <VoteEnd>End Voting</VoteEnd>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default VoteOverlay;
