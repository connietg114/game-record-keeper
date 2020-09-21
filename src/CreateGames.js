import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


function CreateGames(props){
    const [gameName, setGameName] = useState('');
    const [minPlayer, setMinPlayer] = useState('');
    const [maxPlayer, setMaxPlayer] = useState('');

    const[games, setGames] = useState([]);
    var gameList = [];

    var submitHandler = e =>{
        e.preventDefault();
        post(gameName, minPlayer, maxPlayer);
        setGameName('');
        setMinPlayer('');
        setMaxPlayer('');
       alert(gameName + " has been added successfully!");
    };
   
    function post(gameName, minPlayer, maxPlayer) {
        var url = props.config.apiURL + 'api/game/';
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
                    <input type = "text" name="gameName" value={gameName} onChange={e => setGameName(e.target.value)}></input>
                    
                </div>
                <div>
                    Min. Number of Players: 
                    <input type = "text" name="minPlayer" pattern="[0-9]*" value={minPlayer} onChange={e => setMinPlayer(e.target.value)}>
                        {/* alert"Please enter a number" */}
                    </input>
                </div>
                <div>
                    Max. Number of Players: 
                    <input type = "text" name="maxPlayer" pattern="[0-9]*" value={maxPlayer} onChange={e => setMaxPlayer(e.target.value)}></input>
                </div>
                <br></br>
                <button type='submit' >Submit</button>
            </form>
            <br></br>
            
            
            
        </div>
    );
}
export default CreateGames;