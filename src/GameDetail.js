import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import EditGame from './UpdateGame.js';

const useStyles = makeStyles((theme) => ({
    table: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      margin: -1,
      overflow: 'hidden',
      padding: 0,
    },
  }));
  /////////////// EditGame/////////////////////
function getSteps() {
    return ['Edit Game ', 'Edit Game Mode(s)', 'Review and Submit'];
}


    //////////////// EditGame////////////////////

function GameDetail(){

    const config = useContext(ConfigContext);

    const classes = useStyles();
    let location = useLocation();
    var url = location.pathname;
   var gameId;
    if(url.split('/').length>3){
        gameId = url.substr(url.lastIndexOf('/')-1);
        gameId = gameId[0];
        console.log(gameId[0]);
    }else{
        gameId = url.substr(url.lastIndexOf('/') + 1);
    }
    

    const[game, setGame] = useState('');
    const [gameModes, setGameModes] = useState([]);
    useEffect(() => {
    var url = config.apiURL + 'api/game/getGameDetails?id=' + gameId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(game => {
        setGame(game);
        setGameModes(game.gameModes);
        });
    }, [config.apiURL, gameId]);

    /////////////// EditGame/////////////////////
    const steps = getSteps();

    function setGameName (name){
        game.name =  name;
        setGame(game);
    };

    //////////////// EditGame////////////////////
    

    return(
        <div>  
            <EditGame
                title="Edit Game"
                gameName={game.name}
                setGameName={setGameName}
                // minPlayer={minPlayer}
                // setMinPlayer={setMinPlayer}
                // maxPlayer={maxPlayer}
                // setMaxPlayer={setMaxPlayer}
                gameModes={gameModes}
                setGameModes={setGameModes}
                steps={steps}
            ></EditGame> 
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