import React, {useState, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';

function CreateGames(props){

    const config = useContext(ConfigContext);

    const [gameName, setGameName] = useState('');
    const [minPlayer, setMinPlayer] = useState('');
    const [maxPlayer, setMaxPlayer] = useState('');

    var submitHandler = e =>{
        e.preventDefault();
        post(gameName, minPlayer, maxPlayer);
        setGameName('');
        setMinPlayer('');
        setMaxPlayer('');
       alert(gameName + " has been added successfully!");
    };
   
    function post(gameName, minPlayer, maxPlayer) {
        var url = config.apiURL + 'api/game/';
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Name: gameName,
                MinPlayerCount: minPlayer,
                MaxPlayerCount: maxPlayer })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
            // .then(data => setPostId(data.id));
    }

    return (
        <div>
            <h1>Create Games</h1>
                <hr></hr>
                <br></br>
            <form onSubmit={submitHandler}>
                <div>
                    Name: 
                    <input type = "text" name="gameName" value={gameName} onChange={e => setGameName(e.target.value)} required></input>
                    
                </div>
                <div>
                    Min. Number of Players: 
                    <input type = "text" name="minPlayer" pattern="[0-9]*" value={minPlayer} onChange={e => setMinPlayer(e.target.value)} required>
                        {/* alert"Please enter a number" */}
                    </input>
                </div>
                <div>
                    Max. Number of Players: 
                    <input type = "text" name="maxPlayer" pattern="[0-9]*" value={maxPlayer} onChange={e => setMaxPlayer(e.target.value)}required></input>
                </div>
                <br></br>
                <button type='submit' >Submit</button>
            </form>
            <br></br>
            
            
            
        </div>
    );
}
export default CreateGames;