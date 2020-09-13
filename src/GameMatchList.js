//for HOME Recent Games table & MATCHES table
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
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
        history.push('/gamematchdetail/' + props.gameMatch.id);
    }
    

    return (
    <TableRow type="button" onClick={navigateToDetailsPage} hover>
        <TableCell>{props.gameMatch.id}</TableCell>
        <TableCell>{props.gameMatch.game.name}</TableCell>
        <TableCell>{props.gameMatch.status}</TableCell>
        <TableCell>{moment(props.gameMatch.matchDate).format ("YYYY-MM-DD")}</TableCell>
        <TableCell>{moment(props.gameMatch.matchDate).format ("h:mm:ss a")}</TableCell>
        <TableCell>{props.gameMatch.noOfPlayers}</TableCell>
        <TableCell>{props.gameMatch.tournament && props.gameMatch.tournament.name}</TableCell>
    </TableRow>
    );
}


function GameMatchList (props){
    const classes = useStyles();
    return(
        <div>
    {/* <Toolbar><h3>{props.tableName}</h3></Toolbar> */}
        <Paper>
        <TableContainer>
        <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: "bold"}}> Game ID </TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Status</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Date</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Time</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Number of Players</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Tournament Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                {props.games.map((gameMatch , index) => <GameRow key = {index} gameMatch={gameMatch}/>)}
                </TableBody>
            </Table>
            </TableContainer>
            </Paper>
            </div>
    );
}
export default GameMatchList;
