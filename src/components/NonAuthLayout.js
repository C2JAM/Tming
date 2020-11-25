import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NonAuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.capitalizeFirstLetter.bind(this);
  }

  componentDidMount() {
    const currentage = this.capitalizeFirstLetter(this.props.location.pathname);

    document.title = currentage + ' | Tming';
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  render() {
    const { children } = this.props;

    return <>{children}</>;
  }
}

export default withRouter(NonAuthLayout);
