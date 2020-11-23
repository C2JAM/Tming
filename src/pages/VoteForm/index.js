import React from "react";
import styled from "styled-components";
import Cookies from "react-cookies";

import FormChartSet from "./voteform";
import SweetAlert from 'react-bootstrap-sweetalert';
import {LangProvider} from "../../components/Languages/languages";
import TemplateProvider from "./context";

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
            isFirst: window.localStorage.getItem('isFirst'),
            checkVotingAlert: false
        };
    }

    componentDidMount = async () => {
        const cookies = Cookies.loadAll();
        const { login } = cookies;
        this.user_id = login
        const fetchedData = await fetch("/api/v1/vote/data");
        const jsonData = await fetchedData.json();
        if(jsonData.isVoting) {
            this.setState({checkVotingAlert: true})
        }
    }

    moveToNextGuide = (e) => {
        const guideHTML = e.currentTarget.parentNode.parentNode.parentNode;
        const currentID = guideHTML.id;
        const ID = Number(currentID.split('_')[1]);
        const nextID = `guide_${ID+1}`
        const nextGuideHTML = document.querySelector(`#${nextID}`);

        guideHTML.style.visibility = 'hidden';
        if(nextGuideHTML) {
            nextGuideHTML.style.visibility = 'visible';
        }
    }

    endGuide = (e) => {
        const guideHTML = e.currentTarget.parentNode.parentNode.parentNode;
        guideHTML.style.visibility = 'hidden';
        window.localStorage.setItem('isFirst', 'no');
    }

    render() {
        return (
            <TemplateProvider>
                {this.state.isFirst === 'yes' ?
                <React.Fragment>
                    <div className="guide" id="guide_1"> 
                        <div className="guide-box">
                            <div className="guide-box__description">
                                <p><LangProvider LangKey="voteform_guide_1_1" /></p> 
                                <p><LangProvider LangKey="voteform_guide_1_2" /></p>
                            </div>
                            <div className="guide-box__check">
                                <i onClick={this.moveToNextGuide} class="fas fa-check"></i>
                            </div>
                            <div className="guide-box__skip">
                                <i onClick={this.endGuide} class="fas fa-times"></i>
                            </div>
                        </div>
                    </div> 
                    <div className="guide-vote" id="guide_2" style={{visibility: 'hidden'}}> 
                    </div>
                </React.Fragment>
                : null}
                <div className="page-content">
                    <IndexLayout>
                        <div className="container column-flex">
                            {/* <VoteTemplate socket={this.props.socket}/> */}
                            <FormChartSet socket={this.props.socket}/>
                        </div>
                        <iframe frameborder="0"
                        scrolling="no"
                        id="chat_embed"
                        src={`https://www.twitch.tv/embed/${this.user_id}/chat?darkpopout&parent=127.0.0.1`}
                        height="750px"
                        width="50%" 
                        style={{borderRadius: "0.25rem"}}
                        />
                    </IndexLayout>
                </div>
                {this.state.checkVotingAlert? <SweetAlert title={<span id="alert_title"><LangProvider LangKey="vote_already_exist_alert" /></span>}
                 confirmBtnText="OK"
                    onConfirm={()=>{this.setState({checkVotingAlert: false})
                    window.location.href = "./vote";
                    // window.history.back(-1)
                    // fetch("/api/v1/vote/end", {
                    //     method: "POST"
                    //   });
                }}
                   />
                    : null}
            </TemplateProvider>
        )
    }
}

export default Index;