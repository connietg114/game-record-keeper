import React, { useState, useEffect, useContext } from 'react';
import ConfigContext from './ConfigContext';
import { useAuthService } from './useAuthService';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function Profile(props) {

    const config = useContext(ConfigContext);
    var authService = useAuthService(config);

    const [userDetails, setUserDetails] = useState({
            userName: '',
            email: '',
            phoneNumber: ''
        });

    useEffect(() => {

        let cancel = false;

        (async () => {

            const token = await authService.getAccessToken();

            fetch(`${config.apiURL}api/User`, { headers: !token ? {} : { 'Authorization': `Bearer ${token}`} })
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error(response.statusText);
                })
                .then(data => {
                    if (!cancel)
                        setUserDetails(data);
                })
                .catch(error => {
                    console.log(error);
                });
        })()
        
        return () => cancel = true;

    }, [config.apiURL, authService]);

    return (
        <div>
            <h1>Profile</h1>
            <hr></hr>
            <Container>    
                <Grid container justify="center">
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                        <h3>Account Info</h3>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField label="Username" InputProps={{readOnly: true }} fullWidth margin="normal" variant="outlined"
                                    value={userDetails.userName || ''} onChange={e => setUserDetails({ ...userDetails, userName: e.target.value || '' })}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email" InputProps={{readOnly: true }} fullWidth margin="normal" variant="outlined"
                                    value={userDetails.email || ''} onChange={e => setUserDetails({ ...userDetails, email: e.target.value || ''})}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Phone Number" InputProps={{readOnly: true }} fullWidth margin="normal" variant="outlined"
                                    value={userDetails.phoneNumber || '' } onChange={e => setUserDetails({ ...userDetails, phoneNumber: e.target.value || ''})}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
        );
};