import React, { Component } from "react";
import LogoImage from "../../assets/images/logo/tming_logo.png";

class SlotReady extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {

    return (
    <div className="full-screen-page" style={{background:"#000000", color:"#ffffff"}}>
        <div style={{position:"absolute", top:"44%", left:"44%"}}>
        <i class="fas fa-spinner fa-pulse fa-5x">
            
        </i>
        </div>
    </div>);
    
  }
}

export default SlotReady;
