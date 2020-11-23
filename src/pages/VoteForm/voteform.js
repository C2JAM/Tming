import React, { Component } from "react";
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Button,
    CardTitle,
    Container,
    CardSubtitle,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import produce from "immer";
import { Redirect } from "react-router-dom";
import { LangProvider, convert } from "../../components/Languages/languages";

class FormChartSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVoteStart: "null",
            title: "vote",
            vote_list: [""],
            vote_list_id: "",
            chart_type: "pie_1",
            endtime: "1",
            isFirst: window.localStorage.getItem("isFirst"),
            isEmpty: false,
        };
    }

    handleAddRowNested = () => {
        const item1 = "";
        this.setState({
            vote_list: [...this.state.vote_list, item1],
        });
    };

    handleRemoveRowNested = (e, idx) => {
        if (this.state.vote_list.length !== 1) {
            this.setState({
                vote_list: this.state.vote_list.filter((value, index) => {
                    return index !== idx;
                }),
            });
        }
    };

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    onSubListChange = (e) => {
        this.setState(
            produce(this.state, (draft) => {
                draft.vote_list[e.target.id] = e.target.value;
            })
        );
    };

    onEndTimeChange = (e) => {
        this.setState({ endtime: e.target.value });
    };

    onChartOptionChange = (e) => {
        this.setState({ chart_type: e.target.value });
    };

    handleCreate = async () => {
        const response = await fetch("/api/v1/voteform/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            body: JSON.stringify({
                title: this.state.title,
                vote_list: this.state.vote_list,
                chart_type: this.state.charttype,
            }),
        });

        const json = await response.json();

        this.props.handleCreate({
            voteformID: json.data.voteformID,
            title: this.state.title,
            vote_list: this.state.vote_list,
            chart_type: this.state.charttype,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const isPossible = this.state.vote_list.findIndex((value) => value === "");
        if (isPossible !== -1) {
            // 빈 칸이 있을 때
            this.setState({ isEmpty: true });
            return;
        }
        window.gtag("event", "voteStart");

        this.props.socket.emit("slot_url", {
            url: "http://127.0.0.1:5000/voteoverlay",
        });
        const response = await fetch("/api/v1/vote/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            body: JSON.stringify({
                ...this.state,
            }),
        });

        const json = await response.json();

        const { isStart } = json;

        if (isStart) {
            this.setState({ isVoteStart: "yes" });
        } else {
            this.setState({ isVoteStart: "no" });
        }
    };

    moveToOne = (event) => {
        if (event.key === "Enter") {
            document.getElementById("0").focus();
        }
    };

    moveToNext = (event) => {
        let next = null;
        //백스페이스 눌렀을때 아무것도 없으면 input 지우기
        if (event.keyCode === 8 && this.state.vote_list[event.target.id] === "") {
            next = document.getElementById(`${Number(event.target.id) - 1}`);
            this.handleRemoveRowNested(event, Number(event.target.id));

            if (next) {
                next.focus();
            }
        }

        if (event.keyCode === 27) {
            //esc
            next = document.getElementById(`${Number(event.target.id) - 1}`);
            this.handleRemoveRowNested(event, Number(event.target.id));

            if (next) {
                next.focus();
            }
        }

        if (event.keyCode === 13) {
            //enter
            let next = document.getElementById(`${Number(event.target.id) + 1}`);

            if (this.state.vote_list.length - 1 === Number(event.target.id)) {
                this.handleAddRowNested();
            }
        }

        if (event.keyCode === 38) {
            //화살표 위
            let next = document.getElementById(`${Number(event.target.id) - 1}`);

            if (next) {
                next.focus();
            }
        }

        if (event.keyCode === 40) {
            //화살표 아래
            let next = document.getElementById(`${Number(event.target.id) + 1}`);

            if (next) {
                next.focus();
            }
        }
    };

    moveToNext_keyup = (event) => {
        let next = null;
        if (event.keyCode === 13) {
            //enter
            let next = document.getElementById(`${Number(event.target.id) + 1}`);
            if (next) {
                next.focus();
            }
        }
    };

    checkState = () => {
        console.log(this.state);
    };

    handleVoteList = (input) => {
        this.setState({ vote_list: input });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.isEmpty ? (
                    <SweetAlert
                        title={
                            <span id="alert_title">
                                <LangProvider LangKey="vote_has_empty" />
                            </span>
                        }
                        confirmBtnText="OK"
                        onConfirm={() => {
                            this.setState({ isEmpty: false });
                        }}
                    />
                ) : null}
                <Container>
                    <Card className="vote-forms-frame">
                        <CardBody>
                            <CardBody>
                                <CardTitle>
                                    <LangProvider LangKey="real_time_voting" />
                                </CardTitle>
                                <CardSubtitle className="mb-3"></CardSubtitle>

                                <Button onClick={this.handleSubmit} color="primary">
                                    <LangProvider LangKey="start_voting" />
                                </Button>
                                {this.state.isFirst === "yes" && this.state.vote_list[0] ? (
                                    <div className="guide-start-voting">
                                        <Button color="primary" style={{ "margin-right": `20px` }}>
                                            <LangProvider LangKey="start_voting" />
                                        </Button>
                                        <LangProvider LangKey="voteform_guide_2" />
                                    </div>
                                ) : null}
                            </CardBody>

                            <Form className="vote-forms">
                                <FormGroup>
                                    <div className="inner-repeater mb-4">
                                        <table style={{ width: "100%" }}>
                                            <tbody>
                                                {this.state.vote_list.map((item1, idx) => (
                                                    <tr id={"nested" + idx} key={idx}>
                                                        <td>
                                                            <div className="vote_list__box">
                                                                <Input
                                                                    name="vote_list"
                                                                    type="text"
                                                                    className="inner form-control"
                                                                    autoComplete="off"
                                                                    placeholder={
                                                                        convert()[
                                                                            "voteform_placeholder"
                                                                        ]
                                                                    }
                                                                    spellCheck="false"
                                                                    id={idx}
                                                                    value={
                                                                        this.state.vote_list[idx]
                                                                    }
                                                                    onChange={this.onSubListChange}
                                                                    onKeyDown={this.moveToNext}
                                                                    onKeyUp={this.moveToNext_keyup}
                                                                    required
                                                                />
                                                                <a
                                                                    onClick={(e) =>
                                                                        this.handleRemoveRowNested(
                                                                            e,
                                                                            idx
                                                                        )
                                                                    }
                                                                    color="danger"
                                                                    className="vote-list__delete"
                                                                >
                                                                    <i className="fas fa-trash-alt fa-sm"></i>
                                                                </a>
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

export default FormChartSet;
