import React from 'react';
import { Route } from 'react-router-dom';

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  isLayout,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      // if (isAuthProtected && !Cookies.load("login")) {
      //     return (
      //         <Redirect
      //             to={{
      //                 pathname: "/login",
      //                 state: { from: props.location },
      //             }}
      //         />
      //     );
      // }

      if (isLayout === false) {
        return (
          <Component {...props} socket={rest.socket} client={rest.client} />
        );
      }

      return (
        <Layout>
          <Component {...props} socket={rest.socket} client={rest.client} />
        </Layout>
      );
    }}
  />
);

export default AppRoute;
