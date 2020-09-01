import React, {useState, useEffect} from 'react';
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
    
    const[games, setGames] = useState([]);
    fetch('./config.json', {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
    })
    .then(response => response.json())
    .then(data => {
        var url = data.apiURL + 'api/gameMatch/allmatches';

        fetch(url, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json',}
            })
            .then(response => response.json())
            .then(item => {
            setGames(item);
            });
    });
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
                        <TableCell style={{fontWeight: "bold"}}>Time</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Number of Players</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Tournament Name</TableCell>
                    </TableRow>
                </TableHead>
                {games.map(game=>
                <TableRow>
                    <TableCell>{game.game.id}</TableCell>
                    <TableCell>{game.game.name}</TableCell>
                    <TableCell>{game.status}</TableCell>
                    <TableCell>{moment(game.matchDate).format ("YYYY-MM-DD")}</TableCell>
                    <TableCell>{moment(game.matchDate).format ("h:mm:ss a")}</TableCell>
                    <TableCell>{game.noOfPlayers}</TableCell>
                    <TableCell>{game.tournament.name}</TableCell>
                </TableRow>)}
            </Table>
        </div>
    );
}
export default Matches;