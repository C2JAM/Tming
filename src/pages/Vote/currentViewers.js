import React from "react";
import Cookies from "react-cookies";
import ReactApexCharts from "react-apexcharts";
import produce from "immer";

import { twitchClientID } from "../../components/TwitchAPI/twitchAPI";

class CurrentViewers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientID: twitchClientID,
            accessToken: Cookies.load('accessToken'),
            login: Cookies.load('login'),
            isVoting: false,
            onAir: false,
            votedUsersCount: 0,
            currentViewers: 0,
            series: [{
                name: "시청자수",
                data: []
            },
            {
                name: "투표한 시청자 수",
                data: []
            }],
            options: {
                chart: {
                  id: 'realtime',
                  type: 'line',
                  animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                      speed: 2990
                    }
                  },
                  toolbar: {
                    show: false
                  },
                  zoom: {
                    enabled: false
                  }
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },
                markers: {
                  size: 0
                },
                xaxis: {
                    range: 60,
                },
                yaxis:{
                    min: 0
                },
                legend: {
                  show: false
                },
            },
        };

    }

    getCurrentViewers = async () => {
        const fetched = await fetch(`https://api.twitch.tv/helix/streams?user_login=${this.state.login}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this.state.accessToken}`,
                'Client-Id': `${twitchClientID}`
            }
        })
        const json = await fetched.json();

        if(json.data?.length) {
            this.setState({ onAir: true });
        } else {
            this.setState({ onAir: false });
            return 0;
        }

        const { viewer_count } = json.data[0];

        return viewer_count;
    }

    componentDidMount = () => {
        this.handleViewerCount();
        this.intervalID = setInterval(this.handleViewerCount ,3000);
        this.props.socket.on('express-to-client__send-voted-user-count', (data) => {
            this.setState({ votedUsersCount: data.votedUsersCount })
            this.handleVotedUserCount();
        });
    }

    handleViewerCount = async () => {
        const viewer_count = await this.getCurrentViewers();
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        this.setState(
            produce(this.state, (draft) => {
                draft.currentViewers = viewer_count;
                draft.series[0].data.push({ x: seconds % 20 ? ``:`${hours}:${minutes}:${seconds}`, y:viewer_count });
            })
        );
    }

    
    handleVotedUserCount = async () => {
        this.setState(
            produce(this.state, (draft) => {
                draft.series[1].data.push({ x: '', y: this.state.votedUsersCount});
            })
        );

    }

    render() {
        const { votedUsersCount, currentViewers } = this.state;
        return (
            <React.Fragment>
                <div className="currentViewers__wrapper">
                    {this.state.onAir || true? 
                        <ReactApexCharts 
                            options={this.state.options} 
                            series={this.state.series} 
                            type="line" 
                            height="300px"
                            width="400px"
                        />
                    :    
                        <div>     
                            현재 방송 중이 아닙니다.
                        </div>                   
                    }
                    <div className="currentViewers__vote-rate">
                        <div className="currentViewers__vote-rate__title">
                            현재 투표율
                        </div>
                        <div className="currentViewers__vote-rate__percent">
                            {((votedUsersCount/(currentViewers+0.0001))*100).toFixed(1)}%
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

  

export default CurrentViewers;