import React from 'react';
import { Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const AppRoute = ({ component: Component, layout: Layout, isLayout }) => (
  <Route
    render={props => {
      // if (isAuthProtected && !Cookies.load('login')) {
      //   return (
      //     <Redirect
      //       to={{
      //         pathname: '/login',
      //         state: { from: props.location },
      //       }}
      //     />
      //   );
      // }

      if (isLayout === false) {
        return <Component {...props} />;
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

AppRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
  isLayout: PropTypes.bool.isRequired,
};

export default AppRoute;
