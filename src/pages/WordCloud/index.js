import React from "react";
import styled from "styled-components";
import Cookies from "react-cookies";
import { UncontrolledAlert } from "reactstrap";

import WordCloudForm from "./wordcloudform";
import { LangProvider } from "../../components/Languages/languages";
import SlotView from "./slotview";
import SweetAlert from "react-bootstrap-sweetalert";

const IndexLayout = styled.div`
    display: flex;
    justify-content: space-between;
`;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voteform: [],
            voteform_votelist: [],
            isFirst: window.localStorage.getItem("isFirst"),
            optionAlert: false,
            slotAlert: false,
            login: Cookies.load("login"),
        };
    }

    componentDidMount = () => {
        const cookies = Cookies.loadAll();
        const { login } = cookies;
        this.user_id = login;
    };

    displayOptionAlert = () => {
        this.setState({ optionAlert: true });
    };

    displaySlotAlert = () => {
        this.setState({ slotAlert: true });
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

    render() {
        return (
            <React.Fragment>
                {this.state.isFirst === "yes" ? (
                    <React.Fragment>
                        <div className="guide" id="guide_1">
                            <div className="guide-box">
                                <div className="guide-box__description">
                                    <p>
                                        <LangProvider LangKey="voteform_guide_1_1" />
                                    </p>
                                    <p>
                                        <LangProvider LangKey="voteform_guide_1_2" />
                                    </p>
                                </div>
                                <div className="guide-box__check">
                                    <i onClick={this.moveToNextGuide} class="fas fa-check"></i>
                                </div>
                            </div>
                        </div>
                        <div
                            className="guide-vote"
                            id="guide_2"
                            style={{ visibility: "hidden" }}
                        ></div>
                    </React.Fragment>
                ) : null}
                <div className="page-content">
                    <IndexLayout>
                        <div style={{ width: "100%" }}>
                            <WordCloudForm
                                socket={this.props.socket}
                                optionAlert={this.displayOptionAlert}
                                slotAlert={this.displaySlotAlert}
                            />
                            <SlotView />
                        </div>
                        <iframe
                            frameborder="0"
                            scrolling="no"
                            id="chat_embed"
                            src={`https://www.twitch.tv/embed/${this.user_id}/chat?darkpopout&parent=127.0.0.1`}
                            height="750px"
                            width="50%"
                        ></iframe>
                    </IndexLayout>
                </div>
                {this.state.optionAlert ? (
                    <SweetAlert
                        title={
                            <span id="alert_title">
                                <LangProvider LangKey="wordcloudform_apply_option" />
                            </span>
                        }
                        onConfirm={() => {
                            this.setState({ optionAlert: false });
                        }}
                        onCancel={() => {
                            this.setState({ optionAlert: false });
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
            </React.Fragment>
        );
    }
}

export default Index;
