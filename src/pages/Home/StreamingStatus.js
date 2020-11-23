import React, { Component } from "react";
import Cookies from "react-cookies";
import { Container, Row, Col } from "reactstrap";
import Loader from "react-loader-spinner";

import { LangProvider } from "../../components/Languages/languages";
import { twitchClientID } from "../../components/TwitchAPI/twitchAPI";

class StreamingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            accessToken: Cookies.load("accessToken"),
            clientID: twitchClientID,
            login: Cookies.load("login"),
            broadcaster_id: Cookies.load("id"),
            // broadcaster_id: 148057505,
            clips: [],
            lang: Cookies.load("lang"),
        };
        this.thumbnails = null;
        this.container = null;
    }

    componentDidMount = async () => {
        const fetched = await fetch(
            `https://api.twitch.tv/helix/clips?broadcaster_id=${this.state.broadcaster_id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.state.accessToken}`,
                    "Client-Id": `${twitchClientID}`,
                },
            }
        );
        const json = await fetched.json();

        this.setState({
            clips: json.data,
            isLoading: false,
        });
    };

    handleDate(date) {
        return `${date.substring(0, 4)}. ${date.substring(5, 7)}. ${date.substring(8, 10)}.`;
    }

    scrollRight = () => {
        this.thumbnails.scrollLeft +=
            this.container.clientWidth - (this.container.clientWidth % 260);
    };

    scrollLeft = () => {
        let scrollLeft =
            this.thumbnails.scrollLeft -
            (this.container.clientWidth - (this.container.clientWidth % 260));
        scrollLeft -= scrollLeft % 260;
        this.thumbnails.scrollLeft = scrollLeft;
    };

    render() {
        const { clips } = this.state;
        return (
            <React.Fragment>
                <div className="streaming-status__wrapper">
                    <Row className="streaming-status__title">
                        <LangProvider LangKey="my_top_clips" />
                    </Row>
                    <div
                        className="streaming-status"
                        ref={(ref) => {
                            this.container = ref;
                        }}
                    >
                        {this.state.isLoading ? (
                            <div className="loaderWrapper">
                                <Loader type="TailSpin" color="#c2c9e3" height={60} width={60} />
                            </div>
                        ) : (
                            <div
                                className="thumbnails"
                                ref={(ref) => {
                                    this.thumbnails = ref;
                                }}
                            >
                                {clips?.map((value) => {
                                    return (
                                        <div
                                            className="thumbnail"
                                            onClick={() => window.gtag("event", "clickClipVideo")}
                                        >
                                            <a
                                                className="thumbnail__image"
                                                href={value.url}
                                                target="__blank"
                                            >
                                                <div className="thumbnail__accent1"></div>
                                                <div className="thumbnail__accent2"></div>
                                                <div className="thumbnail__accent3"></div>
                                                <div className="thumbnail__accent4"></div>
                                                <img src={value.thumbnail_url} alt="" />
                                            </a>
                                            <a
                                                className="thumbnail__title"
                                                href={value.url}
                                                target="__blank"
                                            >
                                                {value.title}
                                            </a>
                                            <div className="thumbnail__creator">
                                                <span>{value.creator_name}</span>
                                            </div>
                                            <div className="thumbnail__description">
                                                <span>
                                                    {this.state.lang === "ko"
                                                        ? `조회수 ${value.view_count.toLocaleString()}회`
                                                        : `${value.view_count.toLocaleString()}  `}
                                                    <LangProvider LangKey="views" />
                                                </span>
                                                <span className="thumbnail__description__divider">
                                                    •
                                                </span>
                                                <span>{this.handleDate(value.created_at)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <div className="thumbnails__arrow-right" onClick={this.scrollRight}>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        <div className="thumbnails__arrow-left" onClick={this.scrollLeft}>
                            <i class="fas fa-chevron-left"></i>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StreamingStatus;
