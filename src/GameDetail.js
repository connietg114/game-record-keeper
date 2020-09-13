import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";


function GameDetail(props){
    let location = useLocation();
    var url = location.pathname;
    var gameId = url.substr(url.lastIndexOf('/') + 1);

    const[game, setGame] = useState('');
    useEffect(() => {
    var url = props.config.apiURL + 'api/game/getGameDetails?id=' + gameId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGame(item);
        });
    }, []);
    const [gameModes, setGameModes] = useState([]);
    return(
        <div>   
            <h1>Game Details</h1>
            <hr></hr>
            
            <div>
                <p>Game Match ID:{game.id}</p>
                <p>Game Name: {game.name}</p>
                <p>Number of Minimum Players: {game.minPlayerCount}</p>
                <p>Number of Maximum Players: {game.maxPlayerCount}</p>
                {/* {setGameModes(game.gameModes)}
                {gameModes.map((gm, index)=>
                <div key={index}>
                    <p>Game Mode ID: {gm.id}</p>
                    <p>Game Mode Name: {gm.name}</p>
                    
                </div>
                )} */}
            </div>
        </div>

    );

}
export default GameDetail;