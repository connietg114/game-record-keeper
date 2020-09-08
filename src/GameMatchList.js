//for HOME Recent Games table & MATCHES table
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { useHistory } from "react-router-dom";


function GameRow(props) {

    let history = useHistory();
    function navigateToDetailsPage() {
        history.push('/gamedetail/' + props.gameMatch.id);
    }

    return (
    <TableRow type="button" onClick={navigateToDetailsPage}>
        <TableCell>{props.gameMatch.id}</TableCell>
        <TableCell>{props.gameMatch.game.name}</TableCell>
        <TableCell>{props.gameMatch.status}</TableCell>
        <TableCell>{moment(props.gameMatch.matchDate).format ("YYYY-MM-DD")}</TableCell>
        <TableCell>{moment(props.gameMatch.matchDate).format ("h:mm:ss a")}</TableCell>
        <TableCell>{props.gameMatch.noOfPlayers}</TableCell>
        <TableCell>{props.gameMatch.tournament.id}</TableCell>
    </TableRow>
    );
}


function GameMatchList (props){
    return(
        <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: "bold"}}> Game ID </TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Status</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Date</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Time</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Number of Players</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Tournament ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                {props.games.map((gameMatch , index) => <GameRow gameMatch={gameMatch}/>)}
                </TableBody>
            </Table>
    );
}
export default GameMatchList;
