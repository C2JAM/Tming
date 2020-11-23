import React from "react";
import Cookies from "react-cookies";
import { Route, Redirect } from "react-router-dom";

import Login from "../pages/Login/index";

const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, isLayout, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (isAuthProtected && !Cookies.load("login")) {
                return <Login {...props} socket={rest.socket} client={rest.client} />;
                // return (
                //     <Redirect
                //         to={{
                //             pathname: "/login",
                //             state: { from: props.location },
                //         }}
                //     />
                // );
            }

            if (isLayout === false) {
                return <Component {...props} socket={rest.socket} client={rest.client} />;
            } else {
                return (
                    <Layout>
                        <Component {...props} socket={rest.socket} client={rest.client} />
                    </Layout>
                );
            }
        }}
    />
);

export default AppRoute;
