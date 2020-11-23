import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import queryString from "query-string";
import io from 'socket.io-client';
const tmi = require("tmi.js");

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["치킨", "피자", "족발", "냉면", "국밥"],
      seriesPie: [1, 0, 0, 0, 0],
      seriesBar: [
        {
          data: [1, 1, 1, 1, 1],
        },
      ],
    };
  }

  //State 기준으로 차트 다시그려주기
  updateChart() {
    var newarr = this.result_arr.slice(0);
    this.setState(() => ({
      seriesPie: newarr,
      seriesBar: [{ data: newarr }],
    }));
  }

  componentDidMount() { //초기설정

   const socket = io('http://localhost:3000', {
    path: '/api',
  });
   (() => {
    socket.on('welcome', (msg) => {
      console.log(msg);
    });
    })();

  }
  componentWillUnmount() { //페이지 나갈때 설정
    clearInterval(this.interval);

  }
  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={templatePieOption(this.state.labels)}
          series={this.state.seriesPie}
          type="pie"
          height="380"
        />

        <button
          onClick={() => {
            setInterval(() => {
              this.updateChart();
            }, 3000);
          }}
        >
          버튼
        </button>
        <ReactApexChart
          options={templateBarOption(this.state.labels)}
          series={this.state.seriesBar}
          type="bar"
          height="350"
        />
      </React.Fragment>
    );
  }
}

function templatePieOption(labels) {
  var tem = {
    labels: labels,
    colors: [
      "#34c38f",
      "#556ee6",
      "#f46a6a",
      "#50a5f1",
      "#f1b44c",
      "#A5DF00",
      "#D358F7",
      "#BEF781",
    ],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    dataLabels: {
      enabled: true,
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return w.config.labels[seriesIndex];
      },
      style: {
        fontSize: "20px",
      },
    },
  };
  return tem;
}

function templateBarOption(labels) {
  var tem = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },

    colors: ["#556ee6"],
    grid: {
      borderColor: "#556ee6",
    },
    xaxis: {
      categories: labels,
    },
  };
  return tem;
}

export default PieChart;
