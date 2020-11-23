import React, { Component } from "react";
import Cookies from "react-cookies";
import {LangProvider} from "../../components/Languages/languages";
import Loader from 'react-loader-spinner'

import { twitchClientID } from "../../components/TwitchAPI/twitchAPI";

class BroadcastStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBannedUsersLoading: true,
            isModeratorsLoading: true,
            accessToken: Cookies.load('accessToken'),
            clientID: twitchClientID,
            login: Cookies.load('login'),
            broadcaster_id: Cookies.load('id'),
            banned_users: [],
            moderators: [],
        };
    }
    componentDidMount = async () => {
        // banned users
        try {
            const fetched = await fetch(`https://api.twitch.tv/helix/moderation/banned?broadcaster_id=${this.state.broadcaster_id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Client-Id': `${twitchClientID}`
                }
            });
            const json = await fetched.json();

            this.setState({
                banned_users: json.data,
                isBannedUsersLoading: false
            });
        } catch(err) {
            console.log(err);
        }

        // moderators
        try {
            const fetched = await fetch(`https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${this.state.broadcaster_id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Client-Id': `${twitchClientID}`
                }
            });
            const json = await fetched.json();

            this.setState({
                moderators: json.data,
                isModeratorsLoading: false
            });
        } catch(err) {
            console.log(err);
        }

        // setInterval(() => {
        //     this.setState({
        //         banned_users: [...this.state.banned_users, { user_name :"엥에엥에에"}],
        //         moderators: [...this.state.moderators, { user_name :"엥에엥에에"}],
        //     })
        // }, 1000);
    }

    render() {
        return (
            <React.Fragment>
                <div className="broadcast__wrapper">
                    <div className="banned-users__wrapper">
                        <div className="banned-users__title">
                            <LangProvider LangKey="banned_users_title" />
                        </div>
                        <div className="banned-users__users">
                            {this.state.isBannedUsersLoading?
                            <div className="loaderWrapper">
                                <Loader type="TailSpin" color="#c2c9e3" height={60} width={60}/>
                            </div>
                            :
                            this.state.banned_users.map((value) => {
                                return (
                                <div className="banned-users__user">
                                    <div className="banned-users__user-name">
                                        {value.user_name}
                                    </div>
                                </div>
                                );
                            })
                            }
                        </div>
                    </div>
                    <div className="moderators__wrapper">
                        <div className="moderators__title">
                            <LangProvider LangKey="moderators_title" />
                        </div>
                        <div className="moderators__users">
                            {this.state.isBannedUsersLoading?
                            <div className="loaderWrapper">
                                <Loader type="TailSpin" color="#c2c9e3" height={60} width={60}/>
                            </div>
                            :
                            this.state.moderators.map((value) => {
                                return (
                                <div className="moderators__user">
                                    <div className="moderators__user-name">
                                        {value.user_name}
                                    </div>
                                </div>    
                                    );
                            })
                            }
                        </div>
                    </div>
                </div>          
            </React.Fragment>
        )
    }
};

export default BroadcastStatus;
