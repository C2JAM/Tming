import React, { useContext, useRef, useEffect } from "react";

import { TemplateContext, VOTETEMPLATE } from "./context";

function VoteTemplate(props){
    const { template, dispatch } = useContext(TemplateContext);
    const voteTemplateBox = useRef();

    useEffect(() => {
        props.socket.on("express-to-client__end-vote", (newData) => {
            if(window.localStorage.getItem(VOTETEMPLATE)){
                let data = JSON.parse(window.localStorage.getItem(VOTETEMPLATE));
                data.push(newData);
                window.localStorage.setItem(VOTETEMPLATE, JSON.stringify(data));
            } else {
                window.localStorage.setItem(VOTETEMPLATE, JSON.stringify([newData]));
            }
        });
    }, []);
    
    return (
        <div className="container">
            <div className="vote-template" ref={voteTemplateBox}>
                {template.map(value => {
                    const date = new Date(value.currentVote.start_time);
                    return (<div className="vote-template__box">{`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`}</div>);
                })}
            </div>
        </div>
    );
}

export default VoteTemplate;