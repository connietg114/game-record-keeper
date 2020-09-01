import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
// import EditIcon from '@material-ui/core/icons/Edit'; --> Can't resolve '@material-ui/core/icons/Edit'

const style ={
    border: '1px solid black'
}
function Matches(){
    
    var games = [
        {ID: '100',
        name: 'Catan',
        status: 'dontknow',
        date: '2020-03-03',
        noOfPlayers: 10,
        tournamentID: '200'},

        {ID: '110',
        name: 'Monopoly',
        status: 'null',
        date: '2020-03-06',
        noOfPlayers: 10,
        tournamentID: '200'},

        {ID: '111',
        name: 'Go',
        status: 'dontknow',
        date: '2020-03-03',
        noOfPlayers: 10,
        tournamentID: '200'}
        
    ];
    return(
        <div>
            <h1>Matches</h1>
            <hr></hr>
            <br></br>
            <input type="text" placeholder="Search for matches..." ></input>
            <br></br>
            <br></br>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: "bold"}}>Game ID</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Status</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Date</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Number of Players</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Tournament Name</TableCell>
                    </TableRow>
                </TableHead>
                {games.map(game=>
                <TableRow>
                    <TableCell>{game.ID}</TableCell>
                    <TableCell>{game.name}</TableCell>
                    <TableCell>{game.status}</TableCell>
                    <TableCell>{game.date}</TableCell>
                    <TableCell>{game.noOfPlayers}</TableCell>
                    <TableCell>{game.tournamentID}</TableCell>
                </TableRow>)}
            </Table>
           

        </div>
    );
}
export default Matches;