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
import { useLocation, useParams } from "react-router-dom";
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

function GameDetail(props){

    const config = useContext(ConfigContext);

    const classes = useStyles();
    let location = useLocation();
    var url = location.pathname;
    const { gameId } = useParams();

    const[game, setGame] = useState('');
    const [gameModes, setGameModes] = useState();
    const [gameModesArray, setGameModesArray] = useState([]);
    const gmInitialState = {
        id:'',
        name:'Standard',
        description: '',
        winConditionID: 1
    };
    const suceessMessage = " has been edited successfully!";

    useEffect(() => {
    var url = config.apiURL + 'api/game/getGameDetails?id=' + gameId;
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(game => {
        setGame(game);
        setGameModesArray (game.gameModes.map(gm => ({id: gm.id, name: gm.name, description: gm.description, winConditionID:gm.winCondition.id})));
        setGameModes(game.gameModes);

        });
    }, [config.apiURL, gameId]);

    /////////////// EditGame/////////////////////
    const steps = getSteps();

    function setGameName (name){
        setGame({...game, name:name});
    };
    function setMinPlayer(minPlayerCount){
        setGame({...game, minPlayerCount: minPlayerCount});
    }
    function setMaxPlayer(maxPlayerCount){
        setGame({...game, maxPlayerCount:maxPlayerCount});
    }
   
    function edit(gameName, minPlayer, maxPlayer){
        var url = config.apiURL + 'api/game/editGame';
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ID: game.id,
                Name: gameName,
                MinPlayerCount: minPlayer,
                MaxPlayerCount: maxPlayer,
                EditGameModeItems: gameModesArray
             })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }
    function setInitialState(){}
   
    //////////////// EditGame////////////////////


    return props.edit === true ? (
        <React.Fragment>
            <EditGame
                title="Edit Game"
                gameName={game.name}
                setGameName={setGameName}
                minPlayer={game.minPlayerCount}
                setMinPlayer={setMinPlayer}
                maxPlayer={game.maxPlayerCount}
                setMaxPlayer={setMaxPlayer}
                gameModes={gameModesArray}
                setGameModes={setGameModesArray}
                gmInitialState = {gmInitialState}
                steps={steps}
                post={edit}
                suceessMessage={suceessMessage}
                setInitialState={setInitialState}
            ></EditGame> 
        </React.Fragment>
    ) : (
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