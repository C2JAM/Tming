import React, { Component, useState } from "react";
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Button,
    CardTitle,
    Container,
    CardSubtitle,
    UncontrolledAlert,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { Line } from "rc-progress";
import { LangProvider } from "../../components/Languages/languages";
//SweetAlert

import ToolTip from "../../components/ToolTip";

class Vote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 현재 투표가 진행중인지 나타내는 변수 앙앙
            isVoting: false,
            title: "",
            vote_result: [],
            vote_list: [],
            chart_type: "",
            vote_result_sum: 0,
            chart_hidden: false,
            endAlert: false,
            tooltip_use_pie_chart: true,
            datalabels_number_type: true,
            endVoteAlert: false,
        };
    }

    startVote = async () => {
        // 현재 서버로부터 투표 진행상황을 전달받는다.
        // 전달받은 정보로 차트를 설정한다. 앙

        const fetchedData = await fetch("/api/v1/vote/data");
        const jsonData = await fetchedData.json();

        const { isVoting, title, vote_result, vote_list, chart_type } = jsonData;
        console.log(jsonData);
        this.setState({
            isVoting: isVoting,
            title: title,
            vote_result: vote_result,
            vote_list: vote_list,
            chart_type: chart_type,
            vote_result_sum: 0,
        });
        if (isVoting === true) {
            this.interval = setInterval(() => {
                this.currentVote();
            }, 1000);
        }
    };

    currentVote = async () => {
        // 현재 서버로부터 투표 진행상황을 전달받는다.
        // 전달받은 정보로 차트를 설정한다. 앙

        const fetchedData = await fetch("/api/v1/vote/data");
        const jsonData = await fetchedData.json();
        const { vote_result } = jsonData;
        var sum_n = 0;
        for (var i = 0; i < vote_result.length; i++) {
            sum_n = sum_n + vote_result[i];
        }
        this.setState({
            vote_result: vote_result,
            vote_result_sum: sum_n,
        });
    };

    endVote = async () => {
        // 현재 서버로부터 투표 진행상황을 전달받는다.
        // 전달받은 정보로 차트를 설정한다.
        this.setState({ endAlert: true });
        const fetchedData = await fetch("/api/v1/vote/end", {
            method: "POST",
        });
        window.gtag("event", "voteEnd");
        this.props.endVoteAlert();
        window.localStorage.setItem("voteResult", JSON.stringify(this.state));
    };

    getPercent = (idx) => {
        if (this.state.vote_result_sum === 0) return 0;
        else if (this.state.chart_hidden === true) return 100;
        else
            return parseFloat(
                ((this.state.vote_result[idx] / this.state.vote_result_sum) * 100).toFixed(1)
            );
    };

    checkPrecent = () => {
        console.log(this.getPercent());
    };

    usingBarChart = () => {
        console.log("바차트 옵션 소켓");
        this.props.socket.emit("vote-tooltip/change-chart", {
            chart_type: "bar_1",
        });
        this.setState({
            tooltip_use_pie_chart: !this.state.tooltip_use_pie_chart,
        });
    };

    usingPieChart = () => {
        console.log("파이차트 옵션 소켓");
        this.props.socket.emit("vote-tooltip/change-chart", {
            chart_type: "pie_1",
        });
        this.setState({
            tooltip_use_pie_chart: !this.state.tooltip_use_pie_chart,
        });
    };

    hidechart = () => {
        this.props.socket.emit("vote-tooltip/hide-chart", {
            chart_hidden: true,
        });
        this.setState({
            chart_hidden: true,
        });
    };

    hideOffchart = () => {
        this.props.socket.emit("vote-tooltip/hide-chart", {
            chart_hidden: false,
        });
        this.setState({
            chart_hidden: false,
        });
    };

    handleLabelType = () => {
        this.props.socket.emit("vote-tooltip/datalabel-type", {
            datalabels_number_type: !this.state.datalabels_number_type,
        });
        this.setState({
            datalabels_number_type: !this.state.datalabels_number_type,
        });
    };

    componentDidMount = () => {
        console.log(this.state);
        this.startVote();
        // this.props.socket.on("express-to-client__start-vote", () => {
        //   this.startVote();
        // });

        this.props.socket.on("express-to-client__end-vote", () => {
            console.log("투표종료소켓!");
            clearInterval(this.interval);
            this.setState({
                isVoting: false,
            });
        });

        // this.interval = setInterval(() => {
        //   console.log("인터벌 함수 작동중")
        //   this.currentVote()
        // }, 1000);
    };
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateVotedUsers = (idx) => {
        this.props.updateVotedUsers(idx);
    };

    getLastVoting = () => {
        if (!this.state.isVoting) {
            this.setState({
                ...JSON.parse(window.localStorage.getItem("voteResult")),
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <Container>
                    <UncontrolledAlert
                        color="info"
                        className="alert-dismissible fade show"
                        role="alert"
                    >
                        <i class="fas fa-info-circle mr-2"></i>
                        <LangProvider LangKey="if_dont_work" />
                        <i className="fas fa-sync"></i>
                    </UncontrolledAlert>
                    <UncontrolledAlert
                        color="info"
                        className="alert-dismissible fade show"
                        role="alert"
                    >
                        <i class="fas fa-info-circle mr-2"></i>
                        <LangProvider LangKey="info_about_voting" />
                    </UncontrolledAlert>
                    <Card className="vote-forms-frame">
                        <CardBody>
                            <CardBody>
                                <CardTitle>
                                    <LangProvider LangKey="real_time_voting" />
                                </CardTitle>
                                <CardSubtitle className="mb-3"></CardSubtitle>

                                <div className="flex__space-between">
                                    <div>
                                        <Button color="danger" onClick={this.endVote}>
                                            <LangProvider LangKey="end_voting" />
                                        </Button>
                                        {"                     "}
                                        <Button
                                            color="primary"
                                            onClick={() => {
                                                this.props.socket.emit("slot_url", {
                                                    url: "http://127.0.0.1:5000/voteoverlay",
                                                });
                                                this.props.slotAlert();
                                            }}
                                        >
                                            <LangProvider LangKey="vote_apply_slot" />
                                        </Button>
                                        {"                     "}
                                        <Button color="primary" onClick={this.getLastVoting}>
                                            <LangProvider LangKey="getLastVote" />
                                        </Button>
                                    </div>
                                    <div className="tool-tipbar">
                                        {this.state.tooltip_use_pie_chart ? (
                                            <ToolTip
                                                icon={"fas fa-chart-bar fa-2x tool-tip"}
                                                id={0}
                                                onClickFunction={this.usingBarChart}
                                                LangKey={"bar_tooltip"}
                                            />
                                        ) : (
                                            <ToolTip
                                                icon={"fas fa-chart-pie fa-2x tool-tip"}
                                                id={0}
                                                onClickFunction={this.usingPieChart}
                                                LangKey={"pie_tooltip"}
                                            />
                                        )}

                                        {this.state.chart_hidden ? (
                                            <ToolTip
                                                icon={"far fa-eye fa-2x tool-tip"}
                                                id={1}
                                                onClickFunction={this.hideOffchart}
                                                LangKey={"show_tooltip"}
                                            />
                                        ) : (
                                            <ToolTip
                                                icon={"far fa-eye-slash fa-2x tool-tip"}
                                                id={1}
                                                onClickFunction={this.hidechart}
                                                LangKey={"hide_tooltip"}
                                            />
                                        )}
                                        <ToolTip
                                            icon={"fas fa-users fa-2x tool-tip"}
                                            id={2}
                                            onClickFunction={() => this.updateVotedUsers(-1)}
                                            LangKey={"see_all_tooltip"}
                                        />
                                    </div>
                                </div>
                            </CardBody>

                            <Form className="vote-forms">
                                <FormGroup>
                                    <div className="inner-repeater mb-4">
                                        <table style={{ width: "100%" }}>
                                            <tbody>
                                                {this.state.vote_list.map((item1, idx) => (
                                                    <tr id={"nested" + idx} key={idx}>
                                                        <td>
                                                            <div
                                                                onClick={() =>
                                                                    this.updateVotedUsers(idx)
                                                                }
                                                                className="vote_list__box"
                                                            >
                                                                <div className="vote-list">
                                                                    {idx +
                                                                        1 +
                                                                        ".    " +
                                                                        this.state.vote_list[idx]}
                                                                </div>

                                                                <a
                                                                    className="vote-list__delete"
                                                                    id="vote-list__percent"
                                                                >
                                                                    {/* 3항연산자 투표 숨기기면 투표정보 숨기기 */}
                                                                    {this.state.chart_hidden
                                                                        ? ""
                                                                        : `${
                                                                              this.state
                                                                                  .vote_result[idx]
                                                                          } (${this.getPercent(
                                                                              idx
                                                                          )}%)`}
                                                                </a>
                                                                <Line
                                                                    percent={this.getPercent(idx)}
                                                                    strokeWidth="1.2"
                                                                    strokeColor="#6e7fd6"
                                                                    trailWidth="0.5"
                                                                    trailColor="#9da7c5d8"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
                {this.state.isVoteStart === "yes" ? <Redirect to="vote" /> : null}
            </React.Fragment>
        );
    }
}

export default Vote;
