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
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    table: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      margin: -1,
      overflow: 'hidden',
      padding: 0,
    },
  }));

  

function GameRow(props) {
    let history = useHistory();
    function navigateToDetailsPage() {
        history.push('/gamedetail/' + props.game.id);
    }
    return (
    <TableRow type="button" onClick={navigateToDetailsPage} hover>
        <TableCell>{props.game.id}</TableCell>
        <TableCell>{props.game.name}</TableCell>
        <TableCell>{props.game.minPlayerCount}</TableCell>
        <TableCell>{props.game.maxPlayerCount}</TableCell>
        <TableCell>{props.game.gameModes}</TableCell>
        <TableCell></TableCell>
    </TableRow>
    );
}


function Games (props){
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const[games, setGames] = useState([]); 

    useEffect(() => {
        var url = props.config.apiURL + 'api/game/';
        console.log('games');
        fetch(url, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json',}
            })
            .then(response => response.json())
            .then(item => {
                setGames(item);
                setIsLoaded(true);
            });
    }, []);


    if (!isLoaded)
        return null;
    
    return(
        <div>
            <h1>Games</h1>
            <hr></hr>
            <br></br>
            <Paper>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}}> Game ID </TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Number of Minimum Players</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Number of Maximum Players</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Number of Game Mode</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                        {games.map((g, index)=> <GameRow key={index} game={g}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
export default Games;
