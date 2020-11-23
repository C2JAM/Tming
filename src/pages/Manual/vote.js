import React, { useState } from "react";

import { LangProvider } from "../../components/Languages/languages";

import VotePicture1_en from "../../assets/images/manual/vote1_en.png"
import VotePicture2_en from "../../assets/images/manual/vote2_en.png"

import VotePicture1_kr from "../../assets/images/manual/vote1_kr.png"
import VotePicture2_kr from "../../assets/images/manual/vote2_kr.png"

const wordcloud = () => {
    return <React.Fragment>
        <div className="page-content">
            <div className="manual-box">
                <h1><LangProvider LangKey="setting_up_voting" /></h1>
                {}
                <img src={window.localStorage.getItem("lang") === "en" ? VotePicture1_en : VotePicture1_kr}/>
                <div className="desc"><LangProvider LangKey="manual_vote_1_1" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_1_2" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_1_3" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_1_4" /></div>
            </div>
            <div className="manual-box">
                <h1><LangProvider LangKey="current_voting" /></h1>
                <img src={window.localStorage.getItem("lang") === "en" ? VotePicture2_en : VotePicture2_kr}/>
                <div className="desc"><LangProvider LangKey="manual_vote_2_1" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_2_2" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_2_3" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_2_4" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_2_5" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_2_6" /></div>
                <div className="desc"><LangProvider LangKey="manual_vote_2_7" /></div>
            </div>
        </div>
    </React.Fragment>
}

export default wordcloud;

