import React, { useState, useEffect, useContext } from 'react';
import ConfigContext from './ConfigContext';
import { useAuthService } from './useAuthService';

export default function Logout(props) {

    let config = useContext(ConfigContext);
    var authService = useAuthService(config);

    const [message, setMessage] = useState(undefined);

    var getReturnUrl = (state) => {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get('returnUrl');
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.")
        }
        return (state && state.returnUrl) ||
            fromQuery ||
            `${window.location.origin}/logged-out`;
    };

    var navigateToReturnUrl = (returnUrl) => {
        window.location.replace(returnUrl);
    };

    useEffect(() => {
        (async () => {
            var returnUrl = getReturnUrl();
            const isauthenticated = await authService.isAuthenticated();
            if (isauthenticated) {
                const result = await authService.signOut({ returnUrl });
                switch (result.status) {
                    case 'redirect':
                        break;
                    case 'success':
                        await navigateToReturnUrl(returnUrl);
                        break;
                    case 'fail':
                        setMessage(result.message);
                        break;
                    default:
                        throw new Error("Invalid authentication result status.");
                }
            } else {
                setMessage("You successfully logged out!");
            }
        })()
    }, [authService]);

    if (!!message)
        return (<div>{message}</div>);

    return (
        <div>Processing logout</div>
    );
}