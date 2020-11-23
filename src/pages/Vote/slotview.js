import React, { Component } from "react";
import { Card, Container } from "reactstrap";
import { LangProvider } from "../../components/Languages/languages";
class SlotView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <Card className="vote-forms-frame">
                    <iframe
                        title="myframe"
                        src="http://127.0.0.1:5000/voteoverlay"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "550px",
                            border: "none",
                            scrolling: "no",
                        }}
                    ></iframe>
                </Card>
            </Container>
        );
    }
}

export default SlotView;
