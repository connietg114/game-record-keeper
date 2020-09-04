import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";

function GameDetail (props){
    let location = useLocation();
    var url = location.pathname;
    var gameMatchId = url.substr(url.lastIndexOf('/') + 1);
   
    // https://localhost:3000/gamedetails/config.json - if fetch './config.json' here - WRONG
    // https://localhost:300/config.json - this is the correct one
    const[games, setGames] = useState([]);
    var url = props.config.apiURL + 'api/gameMatch/allmatches?id=' + gameMatchId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGames(item);
        });
    
    return (
        <div>   
            <h1>Game Match Details</h1>
            <hr></hr>
            
            
        {games.map(game=>
        <div>
            <p>Game Match ID:{game.id}</p>
            <p>Game Name: {game.game.name}</p>
            <p>Match Date: {moment(game.matchDate).format ("YYYY-MM-DD")}</p>
            <p>Match Time: {moment(game.matchDate).format ("h:mm:ss a")}</p>
            <br></br>
            <p>List of Players:</p>
            <br></br>
            <p>Minimum Number of Players: {game.game.minPlayerCount}</p>
            <p>Maximum Number of Players: {game.game.maxPlayerCount}</p>
            <br></br>
            <p>Tournament ID: {game.tournament.id}</p>
            <p>Tournament Name: {game.tournament.name}</p>
            <p>Start Date: {moment(game.tournament.startDate).format ("YYYY-MM-DD")}</p>
            <p>End Date: {moment(game.tournament.endDate).format ("YYYY-MM-DD")}</p>
            <p>Tournament Type Name: {game.tournament.tournamentType.name}</p>
            <p>Tournament Type Description: {game.tournament.tournamentType.description}</p>

        </div>
        )}
        </div>
    );
}
export default GameDetail;
