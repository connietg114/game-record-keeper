import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import ConfigContext from './ConfigContext';
import { useAuthService } from './useAuthService';
import Button from "@material-ui/core/Button";

export default function LoginMenu(props) {

    let history = useHistory();
    let config = useContext(ConfigContext);
    var authService = useAuthService(config);

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            var authenticated = await authService.isAuthenticated();
            setAuthenticated(authenticated);
        })()
    }, [authService]);
    return (
        <React.Fragment>
            {
                !authenticated &&
                <Button className={props.buttonClassName} color="inherit" onClick={() => history.push("/login")}>Login</Button>
            }
            {
                authenticated &&
                <Button className={props.buttonClassName} color="inherit" onClick={() => history.push("/logout")}>Logout</Button>
            }
        </React.Fragment>
        );
}