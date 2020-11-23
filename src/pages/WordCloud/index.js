import React, { Component } from "react";
import WordCloud from 'react-d3-cloud';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const OverlayContainer = styled.div`
    position: relative;
    background-color: whitesmoke;
    margin-top: 150px;
    margin-bottom: 50px;
    width: 600px;
    height: 100px;
    box-shadow: ${props => props.theme.main_shadow};
    border-radius: 20px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
`;

const OverlayLinkCopy = styled.a`
    background-color: ${props => props.theme.main_color};
    padding: 5px 10px;
    color: white;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    will-change: transform;

    &:hover {
        color: white;
        transform: scale(1.05);
    }
`;


const OverlayButton = styled.a`
    padding: 5px 10px;
    background-color: ${props => props.theme.main_color};
    color: white;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    font-weight: 500;
    will-change: transform;

    &:hover {
        color: white;
        transform: scale(1.05);
    }
`;

const CopySuccess = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    font-weight: 600;
    align-items: center;
    color: white;
    border-radius: 20px;
    animation: ${fadeOut} 1.5s ease-in-out;
`;

const TextArea = styled.textarea`
    width: 270px;
    height: 26px;
    font-size: 12px;
    border: 1.2px solid black;
    resize: none;
    border-radius: 2px;
    outline: none;

    &:focus {
        border: 1.5px solid ${props => props.theme.main_color};
    }
`;

const WordCloudContainer = styled.div`
    background-color: whitesmoke;
    box-shadow: ${props => props.theme.main_shadow};
    margin-bottom: 150px;
    border-radius: 20px;
`;

// Load the SDK and UUID
var AWS = require('aws-sdk');
   
const fontSizeMapper = word => word.value * 5;
const rotate = word => 0;

class Index extends Component {
    constructor(props) {
        super(props);

        // NLP처리를 하지 않는 데이터
        // 여기에 있는 목록들은 NLP처리를 하지 않는다.
        // 세글자 이상만 넣자. 
        this.notNLP = [
            `ㄹㅇㅋㅋ`,
            'ㅋㅋㅋ',
            'ㅋㅋㅋㅋ',
            'ㅋㅋㅋㅋㅋ',
            'ㅋㅋㅋㅋㅋㅋ',
            'ㅋㅋㅋㅋㅋㅋㅋ',
            'ㅋㅋㅋㅋㅋㅋㅋㅋ',
            'ㅗㅜㅑ',
            `ㄷㄷㄷ`,
            `ㄷㄷㄷㄷ`,
            `ㄷㄷㄷㄷㄷ`,
            `ㄷㄷㄷㄷㄷㄷ`,
            `ㅁㄷㅊㅇ`,
            `ㅈㄱㅊㅇ`,
            `졌잘싸`,
        ];
        // NLP통해 정제된 데이터가 newData에 저장된다.
        // {text, timestamp}로 저장하자.
        this.newData = [];
        // 새로 들어온 채팅을 저장하는 배열
        this.newMsg = [];

        this.resultData = [];
        
        this.state =  { 
            copySuccess: false,
            // this.newData에서 타임스탬프가 제거되고 난 후의 최종 데이터
            // 데이터를 {text, value}로 저장하자.
            data : []
        }
    }

    // newData에 있는 정제된 데이터를 처리하자.
    handleNewData = () => {
        if(this.newData)
        {
            // 필터를 통해 시간이 지난 데이터는 삭제하자.
            this.newData = this.newData.filter((obj) => {
                if(Date.now() - obj.timestamp < 30000)
                {
                    return true;
                }
                return false;
            });

            this.resultData = [];
            if(this.newData)
            {
                // 빈 배열로 초기화
                for(let i = 0; i < this.newData.length; ++i)
                {
                    let insertText = this.newData[i].text;
                    var tmpTimestamp = this.newData[i].timestamp;
                    var index = this.resultData.findIndex(x => (x.text === insertText));

                    // 최근 데이터일 수록 높은 값을 주자.
                    var newValue = 70/Math.log(Date.now() - tmpTimestamp);

                    if(index === -1)
                    {
                        this.resultData.push({text: insertText, value: newValue});
                    }
                    else
                    {
                        // 중복된 값은 더 높은 값을 주자.
                        this.resultData[index].value += (newValue*1.8);
                    }
                }
            }

            this.setState({
                data : this.resultData
            });

            // 웹 소켓 통신을 통해 express 서버에 전송
            this.props.socket.emit("client-to-express__wordcloud", this.state.data);
        }
    };  

    // newMsg에 있는 채팅을 처리하는 함수
    // bind를 위한 화살표 함수 처리
    handleNewMSG = () => {
        
        // 만약 새로운 채팅이 있다면
        if(this.newMsg && this.newMsg.length > 0)
        {
            // comprehend로 NLP를 처리하자.
            var params = {
                LanguageCode: 'ko', /* required */
                TextList: this.newMsg
            };
            
            // 새로운 채팅데이터를 NLP로 처리하자.
            this.comprehend.batchDetectKeyPhrases(params, (err, data) => {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    if(data.ResultList.length)
                    {
                        // 가공된 데이터를 처리하자.
                        for(var i = 0; i < data.ResultList.length; ++i)
                        {
                            if(data.ResultList[i].KeyPhrases)
                            {
                                for(var j = 0; j < data.ResultList[i].KeyPhrases.length; ++j)
                                {
                                    const newNlpText = data.ResultList[i].KeyPhrases[j].Text;
                                    
                                    // 한 글자의 가공된 데이터는 처리하지 않는다.
                                    if(newNlpText.length <= 1) continue;
                                    
                                    this.newData.push({
                                        text: newNlpText, 
                                        timestamp: new Date().getTime()
                                    });
                                    
                                }
                            }
                        }
                    }

                    var newData = [];
                    for (let [key, weight] of this.state.resultMap) {
                        var obj = { text : key, value : weight}
                        newData.push(obj);    
                    }

                    this.setState(() => {
                        return {
                            data : newData
                        } ;
                    });

                    console.log(this.state.data);
                }
            });

            // 처리해준 채팅메세지는 없애자.
            this.newMsg = [];

            // this.newData를 처리해주자.
            this.handleNewData();
        }
        // 새로운 채팅이 없다면 아무것도 실행하지 않는다.
        return;
    }
    
    componentDidMount() {
        // Amazon Cognito 인증 공급자를 초기화합니다
        AWS.config.region = 'us-east-1'; // 리전
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:4d7ca8b7-c184-4185-87ce-da7d35903dd6',
        });
        this.comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});
        
        // 트위치 메세지 핸들러
        this.props.client.on("message", (channel, tags, msg, self) => {
            if(self) return;
            
            // msg의 길이가 2이하 일 때
            if(msg && msg.length <= 2)
            {
                this.newData.push({
                    text: msg, 
                    timestamp: Date.now()
                });
            }
            // this.notNLP에 msg에 해당하는 문자열이 있을 경우
            else if(this.notNLP.find(text => text === msg))
            {
                this.newData.push({
                    text: msg, 
                    timestamp: Date.now()
                });
            }
            else
            {
                // 채팅이 올라오면 일단 this.newMsg에 저장하자.
                this.newMsg.push(msg);
                if(this.newMsg.length > 20)
                {
                    this.handleNewMSG();
                }
            }
        });
        
        // 트위치 연결 핸들러
        this.props.client.on("connected", (address, port) => {
            console.log("twitch connected");
        });

        // 1초마다 실행되는 newMsg 핸들러 실행
        this.intervalId1 = setInterval(this.handleNewMSG, 1000);
    }

    componentWillUnmount() {
        // 해당 페이지를 벗어나면 연결을 끊자
        this.comprehend.stopKeyPhrasesDetectionJob();
        clearInterval(this.intervalId1);
    }

    copyToClipboard = () => {
        const wordcloudOverlayLink = this.textArea;
        wordcloudOverlayLink.select();
        document.execCommand('copy');
        this.setState({copySuccess: true});
    };

    render() {
        return (
            <React.Fragment>
                <MainContainer>
                    <OverlayContainer>
                        <TextArea 
                            spellCheck={false}
                            tabIndex={-1}
                            readonly
                            ref={(textarea) => this.textArea = textarea}
                            value="http://localhost:3000/overlay-wordcloud"
                        />
                        <OverlayLinkCopy href="#" onClick={this.copyToClipboard}>
                            오버레이 주소 복사
                        </OverlayLinkCopy>
                        <OverlayButton href="http://localhost:3000/overlay-wordcloud" target="_blank">
                            오버레이 창
                        </OverlayButton>
                        {
                            this.state.copySuccess ?
                            <CopySuccess 
                                onAnimationEnd={() => this.setState({ copySuccess: false })}
                            >
                                복사 성공!
                            </CopySuccess>
                            : null
                        }
                    </OverlayContainer>
                    <WordCloudContainer>
                        <WordCloud
                            data={this.state.data}
                            fontSizeMapper={fontSizeMapper}
                            rotate={rotate}
                        />
                    </WordCloudContainer>
                </MainContainer>
            </React.Fragment>
        );
    }


}

export default Index;
