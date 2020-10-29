import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ConfigContext from './ConfigContext';
import { useAuthService } from './useAuthService';

export default function PrivateRoute(props) {

    const { component: Component, ...rest } = props;

    let config = useContext(ConfigContext);
    var authService = useAuthService(config);

    const [ready, setReady] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            var isAuthenticated = await authService.isAuthenticated();
            setAuthenticated(isAuthenticated);
            setReady(true);
        })()
    }, [authService]);

    var link = document.createElement("a");
    link.href = props.path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `/login?returnUrl=${encodeURI(returnUrl)}`;

    return !ready ? (<div></div>) :
    (
        <Route {...rest} render={(props) => {
            if (authenticated) {
                return <Component {...props} />
            } else {
                return <Redirect to={redirectUrl} />
            }
        }} />
    );
};