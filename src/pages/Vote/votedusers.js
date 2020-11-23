import React from "react";
import { LangProvider } from "../../components/Languages/languages";
class VotedUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voted_users: [],
        };
    }

    componentDidMount = async () => {
        const fetchedData = await fetch("/api/v1/vote/data");
        const jsonData = await fetchedData.json();

        const { voted_users } = jsonData;

        this.setState(
            {
                voted_users: voted_users,
            },
            () => {
                this.scrollToBottom();
            }
        );

        this.props.socket.on("express-to-client__send-new-voted-user", (newVotedUserData) => {
            this.setState(
                {
                    voted_users: [...this.state.voted_users, newVotedUserData],
                },
                () => {
                    this.scrollToBottom();
                }
            );
        });

        this.props.socket.on("express-to-client__end-vote", () => {
            this.setState({
                // voted_users: []
            });
            window.localStorage.setItem("votedUsers", JSON.stringify(this.state.voted_users));
        });

        // setInterval(() => {
        //     this.setState({
        //         voted_users: [...this.state.voted_users, "hihi"]
        //     },() => {
        //         this.scrollToBottom();
        //     })
        // } , 200);
    };

    oneUser(value) {
        const { user_name, index, time } = value;
        const timeStamp = new Date(time).toLocaleString();
        return (
            <div className="voted-user__info">
                <strong style={{ color: "white" }}>{user_name}</strong>
                <LangProvider LangKey="voted_user_1" />{" "}
                <strong style={{ color: "white" }}>{index + 1}</strong>
                <LangProvider LangKey="voted_user_2" />
            </div>
        );
    }

    scrollToBottom = () => {
        const shouldScrollBottom =
            this.container.scrollHeight - this.container.scrollTop > 1000 ? false : true;

        if (shouldScrollBottom) {
            this.container.scrollTop = this.container.scrollHeight;
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="voted-users__wrapper" ref={(el) => (this.container = el)}>
                    {this.state.voted_users.map((value) => {
                        if (this.props.findVotedUsers === -1) {
                            return this.oneUser(value);
                        } else {
                            if (this.props.findVotedUsers === value.index) {
                                return this.oneUser(value);
                            } else {
                                return;
                            }
                        }
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default VotedUsers;
