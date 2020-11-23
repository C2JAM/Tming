import React, { useState } from "react";

import { LangProvider } from "../../components/Languages/languages";

import WordCloudPicture1_en from "../../assets/images/manual/wordcloud1_en.png"
import WordCloudPicture1_kr from "../../assets/images/manual/wordcloud1_kr.png"

const vote = () => {
    return <React.Fragment>
        <div className="page-content">
            <div className="manual-box">
                <h1><LangProvider LangKey="manual_wordcloud_1_title" /></h1>
                <img src={window.localStorage.getItem('lang') === 'en' ? WordCloudPicture1_en : WordCloudPicture1_kr}/>
                <div className="desc"><LangProvider LangKey="manual_wordcloud_1_1" /></div>
                <div className="desc"><LangProvider LangKey="manual_wordcloud_1_2" /></div>
                <div className="desc"><LangProvider LangKey="manual_wordcloud_1_3" /></div>
            </div>
        </div>
    </React.Fragment>
}

export default vote;