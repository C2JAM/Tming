import React, { Component } from "react";
import ReactWordcloud from "react-wordcloud";
import tmi from "tmi.js";
import Compare from "kor-string-similarity";
import Cookies from "react-cookies";

class WordCloudOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: [20, 70],
            chatCount: 15,
            cycle: 4,
            nightMode: false,
            data: [
                { text: "ready...", value: 100 },
                { text: "ready...", value: 100 },
                { text: "ready...", value: 40 },
            ],
            login: Cookies.load("login"),
        };
    }

    async componentDidMount() {
        let json = [];
        try {
            const fetched = await fetch("api/v1/bot/userid");
            json = await fetched.json();
            json = json[0].substring(1);
        } catch (err) {
            console.log(err);
        }

        this.user_id = json;
        const _body = document.querySelector("body");
        _body.style.background = "transparent";
        //TMI 객체 생성
        const client = new tmi.Client({
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [this.user_id],
        });

        //TMI 연결
        client.connect().catch(console.error);
        var N = 0; //채팅개수 변수
        var arrayChat = []; //채팅 공백단위로 끊은 단어 담기 [문자, 유사도]

        //워드클라우드 옵션 웹소켓
        this.props.socket.on("change-wordcloud-option", (data) => {
            this.setState({
                fontSize: data.data.fontSize,
                chatCount: data.data.chatCount,
                nightMode: data.data.nightMode,
                cycle: data.data.cycle,
            });
            if (this.intervalReDraw) {
                clearInterval(this.intervalReDraw);
                this.intervalReDraw = setInterval(() => {
                    this.redraw();
                }, data.data.cycle * 1000);
            }
        });

        this.queue = []; //채팅 큐
        this.words = []; //워드클라우드 처리한 단어 담는곳

        this.intervalReDraw = setInterval(() => {
            this.redraw();
        }, this.state.cycle * 1000);

        //TMI 모듈 메세지 소켓
        client.on("message", (channel, tags, message, self) => {
            N = N + 1;
            // console.log(message)
            var _arr = message.split(" ");
            for (var i = 0; i < _arr.length; i++) {
                //마침표 없에기
                _arr[i] = this.replaceAll(_arr[i], "'", "");
                _arr[i] = this.replaceAll(_arr[i], '"', "");
                if (_arr[i].length > 10) _arr[i] = _arr[i].slice(0, 10);
                _arr[i] = [_arr[i], 0];
            }
            this.queue.push(_arr);
            // console.log(JSON.stringify(this.queue.length))
            // console.log(JSON.stringify(this.queue))
            if (this.queue.length > this.state.chatCount) {
                this.queue.shift();
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalReDraw);
    }

    redraw = () => {
        this.words = [];
        var _L = (() => {
            if (this.queue.length <= this.state.chatCount) return this.queue.length;
            else return this.state.chatCount;
        })();
        for (var i = _L - 1; i >= 0; i--) {
            this.words = this.words.concat(this.queue[i]);
        }
        // console.log(JSON.stringify(this.queue))
        // console.log(JSON.stringify(this.words))

        if (this.words.length) {
            //유사도 검사
            this.simulation(this.words);
            //유사도 검사한 배열로 워드클라우딩 하기
            var wordCloudArr = this.wordClouding(this.words).map((item) => {
                return { text: item[0], value: item[1] };
            });
            this.setState({
                data: wordCloudArr.slice(0, 20),
            });
        }
    };

    replaceAll = (str, searchStr, replaceStr) => {
        return str.split(searchStr).join(replaceStr);
    };

    simulation = (_arr) => {
        for (var i = 0; i < _arr.length; i++) {
            var sum = 0;
            for (var j = 0; j < _arr.length; j++) {
                sum += parseInt(Compare.compareTwoStrings(_arr[i][0], _arr[j][0]) * 100);
            }
            _arr[i][1] = sum;
        }
        _arr.sort();
    };

    wordClouding = (_arr) => {
        const processWordArray = [_arr[0]];
        for (var i = 1; i < _arr.length; i++) {
            var _L = processWordArray.length - 1;
            //유사도가 0.7가 넘어가면
            if (Compare.compareTwoStrings(processWordArray[_L][0], _arr[i][0]) > 0.6) {
                processWordArray[_L][1] = processWordArray[_L][1] + _arr[i][1];
            } else {
                processWordArray.push(_arr[i]);
            }
        }
        return processWordArray.sort(function (a, b) {
            return -(a[1] - b[1]);
        });
    };

    getOption = () => {
        const option = {
            enableTooltip: true,
            deterministic: false,
            fontSizes: this.state.fontSize,
            fontStyle: "normal",
            fontWeight: "normal",
            padding: 7,
            rotations: 3,
            rotationAngles: [0, 0],
            scale: "sqrt",
            spiral: "archimedean",
            transitionDuration: 500,
        };
        return option;
    };

    getBackgroundColor = () => {
        if (this.state.nightMode) return "#000000";
        else return "";
    };

    render() {
        return (
            <div style={{ height: "100vh", width: "100%", background: this.getBackgroundColor() }}>
                <ReactWordcloud options={this.getOption()} words={this.state.data} />
            </div>
        );
    }
}

export default WordCloudOverlay;
