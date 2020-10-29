import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import ConfigContext from './ConfigContext';
import { useAuthService } from './useAuthService';
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

export default function LoginMenu(props) {

    let history = useHistory();
    let config = useContext(ConfigContext);
    var authService = useAuthService(config);

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        let cancel = false;

        (async () => {
            var isAuthenticated = await authService.isAuthenticated();
            if (!cancel)
                setAuthenticated(isAuthenticated);
        })()

        return () => cancel = true;
    }, [authService]);

    return props.isMobile ? (
            <React.Fragment>
                {
                    !authenticated &&
                    <MenuItem onClick={() => history.push("/login")}>Login</MenuItem>
                }
                {
                    authenticated &&
                    <React.Fragment>
                        <MenuItem key="menu_profile" onClick={() => history.push("/profile")}>Profile</MenuItem>
                        <MenuItem key="menu_logout" onClick={() => history.push("/logout")}>Logout</MenuItem>
                    </React.Fragment>
                }
            </React.Fragment>
        ) : (
            <React.Fragment>
                {
                    !authenticated &&
                    <Button className={props.buttonClassName} color="inherit" onClick={() => history.push("/login")}>Login</Button>
                }
                {
                    authenticated &&
                    <React.Fragment>
                        <Button className={props.buttonClassName} color="inherit" onClick={() => history.push("/profile")}>Profile</Button>
                        <Button className={props.buttonClassName} color="inherit" onClick={() => history.push("/logout")}>Logout</Button>
                    </React.Fragment>
                }
            </React.Fragment>
        );
}