import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";
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

function GameDetail(props){
    const classes = useStyles();
    let location = useLocation();
    var url = location.pathname;
    var gameId = url.substr(url.lastIndexOf('/') + 1);

    const[game, setGame] = useState('');
    const [gameModes, setGameModes] = useState([]);
    useEffect(() => {
    var url = props.config.apiURL + 'api/game/getGameDetails?id=' + gameId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(game => {
        setGame(game);
        setGameModes(game.gameModes);
        });
    }, []);
    

    return(
        <div>   
            <h1>Game Details</h1>
            <hr></hr>
            
            <div>
                <p>Game Match ID:{game.id}</p>
                <p>Game Name: {game.name}</p>
                <p>Number of Minimum Players: {game && game.minPlayerCount}</p>
                <p>Number of Maximum Players: {game && game.maxPlayerCount}</p>
               
                <br></br>
                <Paper>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: "bold"}}>No.</TableCell>
                                    <TableCell style={{fontWeight: "bold"}}>Game Mode ID</TableCell>
                                    <TableCell style={{fontWeight: "bold"}}>Game Mode Name</TableCell>     
                                    <TableCell style={{fontWeight: "bold"}}>Win Condition ID</TableCell>      
                                    <TableCell style={{fontWeight: "bold"}}>Win Condition Name</TableCell>      
                                    <TableCell style={{fontWeight: "bold"}}>Win Condition Description</TableCell>      
                                                                       
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {gameModes.map((gm, index)=>
                                <TableRow key={index} hover>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{gm && gm.id}</TableCell>
                                    <TableCell>{gm && gm.name}</TableCell>
                                    <TableCell>{gm.winCondition && gm.winCondition.id}</TableCell>
                                    <TableCell>{gm.winCondition && gm.winCondition.name}</TableCell>
                                    <TableCell>{gm.winCondition && gm.winCondition.description}</TableCell>
                                    {/* win condition - null */}
                                </TableRow> 
                                
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                
            </div>
        </div>

    );

}
export default GameDetail;