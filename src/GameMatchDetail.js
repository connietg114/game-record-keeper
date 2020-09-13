import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";

function GameMatchDetail (props){
    let location = useLocation();
    var url = location.pathname;
    var gameMatchId = url.substr(url.lastIndexOf('/') + 1);
   
    // https://localhost:3000/gamedetails/config.json - if fetch './config.json' here - WRONG
    // https://localhost:300/config.json - this is the correct one
    const[gameMatch, setGameMatch] = useState([]);
    useEffect(() => {
    var url = props.config.apiURL + 'api/gameMatch/getGameMatchDetails?id=' + gameMatchId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGameMatch(item);
        });
    }, []);
    
    return (
        <div>   
            <h1>Game Match Details</h1>
            <hr></hr>  
       
        <div>
            <p>Game Match ID:{gameMatch.id}</p>
            <p>Game ID:{gameMatch.game && gameMatch.game.id}</p>
            <p>Game Name: {gameMatch.game && gameMatch.game.name}</p>
            <p>Match Date: {moment(gameMatch.matchDate).format ("YYYY-MM-DD")}</p>
            <p>Match Time: {moment(gameMatch.matchDate).format ("h:mm:ss a")}</p>
            <br></br>
            <p>List of Players:</p>
            <br></br>
            <p>Minimum Number of Players: {gameMatch.game && gameMatch.game.minPlayerCount}</p>
            <p>Maximum Number of Players: {gameMatch.game && gameMatch.game.maxPlayerCount}</p>
            <br></br>
            <p>Tournament ID: {gameMatch.tournament && gameMatch.tournament.id}</p>
            <p>Tournament Name: {gameMatch.tournament && gameMatch.tournament.name}</p>
            <p>Start Date: {moment(gameMatch.tournament && gameMatch.tournament.startDate).format ("YYYY-MM-DD")}</p>
            <p>End Date: {moment(gameMatch.tournament && gameMatch.tournament.endDate).format ("YYYY-MM-DD")}</p>
            <p>Tournament Type Name: {gameMatch.tournament && gameMatch.tournament.tournamentType.name}</p>
            <p>Tournament Type Description: {gameMatch.tournament && gameMatch.tournament.tournamentType.description}</p>
            {/* Havent added GameMode details */}
        </div>
       
        </div>
    );
}
export default GameMatchDetail;
