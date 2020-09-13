import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";


function GameDetail(props){
    let location = useLocation();
    var url = location.pathname;
    var gameId = url.substr(url.lastIndexOf('/') + 1);

    const[games, setGames] = useState([]);
    useEffect(() => {
    var url = props.config.apiURL + 'api/game?id=' + gameId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGames(item);
        });
    }, []);
    return(
        <div>   
            <h1>Game Details</h1>
            <hr></hr>
            {games.map((game, index)=>
        <div key={index}>
            <p>Game Match ID:{game.id}</p>
            <p>Game Name: {game.name}</p>
            <p>Number of Minimum Players: {game.minPlayerCount}</p>
            <p>Number of Maximum Players: {game.maxPlayerCount}</p>

        </div>)}
        </div>

    );

}
export default GameDetail;