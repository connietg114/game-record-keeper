//for HOME Recent Tournaments table
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

const useStyles = makeStyles((theme) => ({
    table: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        margin: -1,
        overflow: 'hidden',
        padding: 0,
    },
}));


function TournamentRow(props) {

    let history = useHistory();
    function navigateToDetailsPage() {
        history.push('/TournamentDetail/' + props.tournament.id);
    }


    return (
        <TableRow type="button" onClick={navigateToDetailsPage} hover>
            <TableCell>{props.tournament.id}</TableCell>
            <TableCell>{props.tournament.name}</TableCell>
            <TableCell>{moment(props.tournament.startDate).format("YYYY-MM-DD")}</TableCell>
            <TableCell>{moment(props.tournament.startDate).format("h:mm:ss a")}</TableCell>
            <TableCell>{moment(props.tournament.EndDate).format("YYYY-MM-DD")}</TableCell>
            <TableCell>{moment(props.tournamenEndDate).format("h:mm:ss a")}</TableCell>
            <TableCell>{props.tournament.tournamentType.name}</TableCell>
            {props.delete && <TableCell><button onClick={e => props.onDelete(props.tour.id)}>Delete</button></TableCell>}
        </TableRow>
    );
}


function TournamentList(props) {
    const classes = useStyles();
    return (
        <div>
            {/*<Toolbar><h3>{props.tableName}</h3></Toolbar>*/}
            <Paper>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Tournament ID</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Start Date</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Start Time</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>End Date</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>End Time</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Tournament Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {props.tournaments.map((tournament, index) => <TournamentRow key={index} tournament={tournament} onDelete={props.onDelete} delete={props.delete}/>)}
                        </TableBody>
                        
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
export default TournamentList;