import React, { useState, useEffect } from 'react';

export default function LoggedOut(props) {

    const [isReady, setIsReady] = useState(false);
    const [message, setMessage] = useState(undefined);

    useEffect(() => {
        setIsReady(true);
        setMessage('You succesfully logged out!');
    }, []);

    if (!isReady) {
        return (<div></div>);
    }

    return (<div>{message}</div>);
}