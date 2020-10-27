import { useState, useEffect } from 'react';

function useConfig(props) {

    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('/config.json', {
            method: 'GET', 
            headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(data => setConfig(data)); 
    }, []);

    return config;
}

export { useConfig }