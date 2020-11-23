import React, { Component } from "react";
import Cookies from "react-cookies";
import LoginStatus from "./LoginStatus";
import StreamingStatus from "./StreamingStatus";
import Landing from "./Landing";
import { LangProvider, convert } from "../../components/Languages/languages";
import SweetAlert from "react-bootstrap-sweetalert";
//import BroadcastStatus from "./BroadcastStatus.js";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirst: window.localStorage.getItem("isFirst"),
            copyAlert: false,
            lang: window.localStorage.getItem("lang"),
        };
    }
    componentDidMount() {
        const userID = Cookies.load("login");
        window.gtag("set", { user_id: userID });
        window.gtag("event", `login_${userID}`);
        console.log(convert());
        console.log(convert()["main_upper_title"]);
    }

    displayCopyAlert = () => {
        this.setState({
            copyAlert: true,
        });
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

    endGuide = (e) => {
        const guideHTML = e.currentTarget.parentNode.parentNode.parentNode;
        guideHTML.style.visibility = "hidden";
        window.localStorage.setItem("isFirst", "no");
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
                                        <LangProvider LangKey="home_guide_1_1" />
                                    </p>
                                    <p>
                                        <LangProvider LangKey="home_guide_1_2" />
                                    </p>
                                </div>
                                <div className="guide-box__check">
                                    <i onClick={this.moveToNextGuide} class="fas fa-check"></i>
                                </div>
                                <div className="guide-box__skip">
                                    <i onClick={this.endGuide} class="fas fa-times"></i>
                                </div>
                            </div>
                        </div>

                        <div className="guide" id="guide_2" style={{ visibility: "hidden" }}>
                            <div className="guide-box">
                                <div className="guide-box__description">
                                    <p>
                                        <LangProvider LangKey="home_guide_2" />
                                    </p>
                                </div>
                                <div className="guide-box__check">
                                    <i onClick={this.moveToNextGuide} class="fas fa-check"></i>
                                </div>
                                <div className="guide-box__skip">
                                    <i onClick={this.endGuide} class="fas fa-times"></i>
                                </div>
                            </div>
                        </div>
                        <div className="guide-header" id="guide_3" style={{ visibility: "hidden" }}>
                            <div className="guide-box">
                                <div className="guide-box__description">
                                    <p>
                                        <LangProvider LangKey="home_guide_3" />
                                    </p>
                                </div>
                                <div className="guide-box__skip">
                                    <i onClick={this.endGuide} class="fas fa-times"></i>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : null}
                <div className="page-content">
                    <div className="vertical-flex">
                        <LoginStatus copyAlert={this.displayCopyAlert} socket={this.props.socket} />
                        {/* <BroadcastStatus /> */}
                        <StreamingStatus />
                        {this.state.lang === "en" ? (
                            <>
                                <iframe
                                    style={{ marginTop: "40px", marginBottom: "40px" }}
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/LUgMgII_guQ"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed//IcM_FhEdZdQ"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </>
                        ) : (
                            <>
                                <iframe
                                    style={{ marginTop: "40px", marginBottom: "40px" }}
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed//L2Bn8Os93q4"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                                <iframe
                                    style={{ marginTop: "40px", marginBottom: "40px" }}
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed//jqjAi88ZAgk"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </>
                        )}
                        {this.state.lang === "en" ? (
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLScjxGiy3A9XDKNrJ7eY_yvztyyLzL2XGnt684AgZ3vq-6ySzQ/viewform?embedded=true"
                                scrolling="no"
                                width="640"
                                height="645"
                                frameborder="0"
                                marginheight="0"
                                marginwidth="0"
                            >
                                로드 중…
                            </iframe>
                        ) : (
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSffgERm271srjK7e2UV-1m-VITQXQKJ7IM4pd3mbgWOX1gXNg/viewform?embedded=true"
                                scrolling="no"
                                width="640"
                                height="645"
                                frameborder="0"
                                marginheight="0"
                                marginwidth="0"
                            >
                                로드 중…
                            </iframe>
                        )}
                        <Landing />
                    </div>
                </div>
                {this.state.copyAlert ? (
                    <SweetAlert
                        title={
                            <span id="alert_title">
                                <LangProvider LangKey="copy_alert" />
                            </span>
                        }
                        onConfirm={() => {
                            this.setState({ copyAlert: false });
                        }}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

export default Home;
