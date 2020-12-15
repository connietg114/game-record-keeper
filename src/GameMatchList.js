//for HOME Recent Games table & MATCHES table
import React from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
    <TableRow type="button" hover>
        <TableCell onClick={navigateToDetailsPage}>{props.gameMatch.id}</TableCell>
        <TableCell onClick={navigateToDetailsPage}>{props.gameMatch.game.name}</TableCell>
        <TableCell onClick={navigateToDetailsPage}>{props.gameMatch.status}</TableCell>
        <TableCell onClick={navigateToDetailsPage}>{moment(props.gameMatch.matchDate).format ("YYYY-MM-DD")}</TableCell>
        <TableCell onClick={navigateToDetailsPage}>{moment(props.gameMatch.matchDate).format ("h:mm:ss a")}</TableCell>
        <TableCell onClick={navigateToDetailsPage}>{props.gameMatch.noOfPlayers}</TableCell>
        <TableCell onClick={navigateToDetailsPage}>{props.gameMatch.tournament && props.gameMatch.tournament.name}</TableCell>
        {/* <TableCell><button onClick={navigateToDetailsPage}>Click to View</button></TableCell> */}
        {props.delete && 
        <TableCell>
            <IconButton onClick={e => props.onDelete(props.gameMatch.id)}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>}
        {props.edit &&
        <TableCell>
            <IconButton>
                <EditIcon/>
            </IconButton>
        </TableCell>} 
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
                        <TableCell style={{fontWeight: "bold"}}> Match ID </TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Status</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Date</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Time</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Number of Players</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Tournament Name</TableCell>
                        {props.delete && <TableCell style={{fontWeight: "bold"}}>Delete</TableCell>}
                        {props.edit && <TableCell style={{fontWeight: "bold"}}>Edit</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody >
                {props.games.map((gameMatch , index) => 
                <GameRow 
                    key = {index} 
                    gameMatch={gameMatch} 
                    onDelete={props.onDelete} 
                    delete={props.delete}
                    edit = {props.edit}
                />)}
                </TableBody>
            </Table>
            </TableContainer>
            </Paper>
            </div>
    );
}
export default GameMatchList;
