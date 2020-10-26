import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import ConfigContext from './ConfigContext';
import './index.css';
import moment from 'moment';
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      margin: -1,
      overflow: 'hidden',
      padding: 0,
    },
  }));

function GameMatchDetail (props){

    const config = useContext(ConfigContext);

    const classes = useStyles();
    let location = useLocation();
    var url = location.pathname;
    var gameMatchId = url.substr(url.lastIndexOf('/') + 1);
   
    // https://localhost:3000/gamedetails/config.json - if fetch './config.json' here - WRONG
    // https://localhost:300/config.json - this is the correct one
    const [gameModes, setGameModes] = useState([]);
    const[gameMatch, setGameMatch] = useState([]);
    useEffect(() => {
    var url = config.apiURL + 'api/gameMatch/getGameMatchDetails?id=' + gameMatchId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(gm => {
        setGameMatch(gm);
        setGameModes(gm.game.gameModes);
        });
    }, []);
    
    return (
        <div>   
            <h1>Game Match Details</h1>
            <hr></hr>  
       
        <div>
            <p>Game Match ID:{gameMatch.id}</p>
            {/* <p>Game ID:{gameMatch.game && gameMatch.game.id}</p> */}
            <p>Game Name: {gameMatch.game && gameMatch.game.name}</p>
            <p>Match Date: {moment(gameMatch.matchDate).format ("YYYY-MM-DD")}</p>
            <p>Match Time: {moment(gameMatch.matchDate).format ("h:mm:ss a")}</p>
            <br></br>
           
            <br></br>
            <p>Number of Players: </p>
            <Toolbar>
                <Typography style={{fontWeight: "bold"}}>Players List</Typography>
            </Toolbar>
            <Paper>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: "bold"}}>No.</TableCell>
                                    <TableCell style={{fontWeight: "bold"}}>Player ID</TableCell>    
                                    <TableCell style={{fontWeight: "bold"}}>Gender</TableCell> 
                                    <TableCell style={{fontWeight: "bold"}}>Preferred Name</TableCell> 
                                    <TableCell style={{fontWeight: "bold"}}>First Name</TableCell>  
                                    <TableCell style={{fontWeight: "bold"}}>Middle Name</TableCell>  
                                    <TableCell style={{fontWeight: "bold"}}>Last Name</TableCell>
                                                                                                           
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow></TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            <br></br>
            <Toolbar>
                <Typography style={{fontWeight: "bold"}}>Game Mode</Typography>
            </Toolbar>
            <Paper>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: "bold"}}>No.</TableCell>
                                    <TableCell style={{fontWeight: "bold"}}>Game Mode Name</TableCell>    
                                    <TableCell style={{fontWeight: "bold"}}>Win Condition Description</TableCell>                                                                         
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {gameModes.map((gm, index)=>
                                <TableRow key={index} hover>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{gm && gm.name}</TableCell>                                   
                                    <TableCell>{gm.winCondition && gm.winCondition.description}</TableCell>
                                    
                                </TableRow> 
                                
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            
            <br></br>
            <p>Tournament ID: {gameMatch.tournament && gameMatch.tournament.id}</p>
            <p>Tournament Name: {gameMatch.tournament && gameMatch.tournament.name}</p>
            <p>Start Date: {moment(gameMatch.tournament && gameMatch.tournament.startDate).format ("YYYY-MM-DD")}</p>
            <p>End Date: {moment(gameMatch.tournament && gameMatch.tournament.endDate).format ("YYYY-MM-DD")}</p>
            <p>Tournament Type Name: {gameMatch.tournament && gameMatch.tournament.tournamentType.name}</p>
            <p>Tournament Type Description: {gameMatch.tournament && gameMatch.tournament.tournamentType.description}</p>
            {/* Havent added GameMode & winCondition */}
        </div>
       
        </div>
    );
}
export default GameMatchDetail;
