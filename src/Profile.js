import React, { useEffect, useContext } from 'react';
import ConfigContext from './ConfigContext';
import { useAuthService } from './useAuthService';

export default function Profile(props) {

    const config = useContext(ConfigContext);
    var authService = useAuthService(config);

    useEffect(() => {

        (async () => {

            const token = await authService.getAccessToken();

            fetch(`${config.apiURL}api/User`, { headers: !token ? {} : { 'Authorization': `Bearer ${token}`} })
                .then(response => {

                })
                .catch(error => {

                });
        })()
        
    }, [config.apiURL, authService]);

    return (
        <div>
            <h1>Profile</h1>
            <hr></hr>
            
        </div>
        );
};