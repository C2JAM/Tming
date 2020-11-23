import React, { Component } from "react";
import styled from "styled-components";

import Vote from "./vote";
import VotedUsers from "./votedusers";
import Cookies from "react-cookies";
import { LangProvider } from "../../components/Languages/languages";
import SlotView from "./slotview";
import SweetAlert from "react-bootstrap-sweetalert";

const IndexLayout = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;

const VoteInfoLayout = styled.div`
    display: flex;
    justify-content: space-space-between;
    width: 100%;
    margin-right: 12px;
`;

const VoteInfoChartsLayout = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirst: window.localStorage.getItem("isFirst"),
            findVotedUsers: -1,
            endVoteAlert: false,
            slotAlert: false,
        };
    }

    displayEndVoteAlert = () => {
        this.setState({ endVoteAlert: true });
    };

    displaySlotAlert = () => {
        this.setState({ slotAlert: true });
    };

    componentDidMount = () => {
        const cookies = Cookies.loadAll();
        const { login } = cookies;
        this.user_id = login;
        const _body = document.querySelector("h2");
    };

    moveToNextGuide = (e) => {
        const guideHTML = e.currentTarget.parentNode.parentNode.parentNode;
        const currentID = guideHTML.id;
        const ID = Number(currentID.split("_")[1]);
        const nextID = `guide_${ID + 1}`;
        const nextGuideHTML = document.querySelector(`#${nextID}`);

        guideHTML.style.visibility = "hidden";
        if (nextGuideHTML) {
            nextGuideHTML.style.visibility = "visible";
        }
    };

    guideFinish = (e) => {
        const guideHTML = e.currentTarget.parentNode.parentNode.parentNode;

        guideHTML.style.visibility = "hidden";
        window.localStorage.setItem("isFirst", "no");
    };

    updateVotedUsers = (idx) => {
        this.setState({ findVotedUsers: idx });
    };

    setFindVotedUsers = () => {
        this.setState({ findVotedUsers: -1 });
    };

    endGuide = (e) => {
        const guideHTML = e.currentTarget.parentNode.parentNode.parentNode;
        guideHTML.style.visibility = "hidden";
        window.localStorage.setItem("isFirst", "no");
    };

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <IndexLayout>
                        {this.state.isFirst === "yes" ? (
                            <React.Fragment>
                                <div className="guide" id="guide_1">
                                    <div className="guide-box">
                                        <div className="guide-box__description">
                                            <p>
                                                <LangProvider LangKey="vote_guide_1_1" />
                                            </p>
                                            <p>
                                                <LangProvider LangKey="vote_guide_1_2" />
                                            </p>
                                        </div>
                                        <div className="guide-box__check">
                                            <i
                                                onClick={this.moveToNextGuide}
                                                class="fas fa-check"
                                            ></i>
                                        </div>
                                        <div className="guide-box__skip">
                                            <i onClick={this.endGuide} class="fas fa-times"></i>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="guide"
                                    id="guide_2"
                                    style={{ visibility: "hidden" }}
                                >
                                    <div className="guide-box">
                                        <div className="guide-box__description">
                                            <p>
                                                <LangProvider LangKey="vote_guide_2" />
                                            </p>
                                        </div>
                                        <div className="guide-box__check">
                                            <i
                                                onClick={this.moveToNextGuide}
                                                class="fas fa-check"
                                            ></i>
                                        </div>
                                        <div className="guide-box__skip">
                                            <i onClick={this.endGuide} class="fas fa-times"></i>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="guide"
                                    id="guide_3"
                                    style={{ visibility: "hidden" }}
                                >
                                    <div className="guide-box">
                                        <div className="guide-box__description">
                                            <p>
                                                <LangProvider LangKey="vote_guide_3" />
                                            </p>
                                        </div>
                                        <div className="guide-box__check">
                                            <i onClick={this.guideFinish} class="fas fa-check"></i>
                                        </div>
                                        <div className="guide-box__skip">
                                            <i onClick={this.endGuide} class="fas fa-times"></i>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : null}

                        <VoteInfoLayout>
                            <VotedUsers
                                socket={this.props.socket}
                                findVotedUsers={this.state.findVotedUsers}
                                setFindVotedUsers={this.setFindVotedUsers}
                            />
                            <VoteInfoChartsLayout>
                                <Vote
                                    socket={this.props.socket}
                                    updateVotedUsers={this.updateVotedUsers}
                                    endVoteAlert={this.displayEndVoteAlert}
                                    slotAlert={this.displaySlotAlert}
                                />
                                <SlotView />
                            </VoteInfoChartsLayout>
                        </VoteInfoLayout>
                        <iframe
                            frameborder="0"
                            scrolling="no"
                            id="chat_embed"
                            src={`https://www.twitch.tv/embed/${this.user_id}/chat?darkpopout&parent=127.0.0.1`}
                            height="600px"
                            width="50%"
                            style={{ borderRadius: "0.25rem" }}
                        ></iframe>
                    </IndexLayout>
                    {this.state.endVoteAlert ? (
                        <SweetAlert
                            title={
                                <span id="alert_title">
                                    <LangProvider LangKey="vote_end_alert" />
                                </span>
                            }
                            onConfirm={() => {
                                this.setState({ endVoteAlert: false });
                            }}
                            onCancel={() => {
                                this.setState({ endVoteAlert: false });
                            }}
                        />
                    ) : null}
                    {this.state.slotAlert ? (
                        <SweetAlert
                            title={
                                <span id="alert_title">
                                    <LangProvider LangKey="vote_apply_to_slot_alert" />
                                </span>
                            }
                            onConfirm={() => {
                                this.setState({ slotAlert: false });
                            }}
                            onCancel={() => {
                                this.setState({ slotAlert: false });
                            }}
                        />
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}

export default Index;
