import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';

function Home(){
    var _ = require('lodash');//do we need this?

    const[games, setGames] = useState([]);

    fetch('./config.json', {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
    })
    .then(response => response.json())
    .then(data => {
        var url = data.apiURL + 'api/gameMatch/';

        fetch(url, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json',}
            })
            .then(response => response.json())
            .then(item => {
            setGames(item);
            });
    });

    
        
    // games= _.orderBy(games, ['date','name'], ['asc','asc']); //sort by date then name
    
    var tournaments = [
        {ID: '100',
        name: 'Go',
        startDate: '2019-03-04',
        endDate:'2020-01-02',
        type:'null'},
        
        {ID: '101',
        name: 'Catan',
        startDate: '2019-03-04',
        endDate:'2020-01-02',
        type:'null'},
    
        {ID: '120',
        name: 'Chess',
        startDate: '2019-03-04',
        endDate:'2020-01-02',
        type:'null'},
    
        {ID: '120',
        name: 'Connect Four',
        startDate: '2019-03-04',
        endDate:'2020-01-02',
        type:'null'},
    
        {ID: '105',
        name: 'Monopoly',
        startDate: '2019-03-04',
        endDate:'2020-01-02',
        type:'null'},]

    return(
        <div>
            <h1>Home</h1>
            <hr></hr>
            <br></br>
            <h3 style={{textDecorationLine:'underline'}}>Recent Games</h3>
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
                <TableBody>
                {games.map(game=>
                <TableRow>
                    <TableCell>{game.game.id}</TableCell>
                    <TableCell>{game.game.name}</TableCell>
                    <TableCell>{game.status}</TableCell>
                    <TableCell>{moment(game.matchDate).format ("YYYY-MM-DD")}</TableCell>
                    <TableCell>{moment(game.matchDate).format ("h:mm:ss a")}</TableCell>
                    <TableCell>{game.noOfPlayers}</TableCell>
                    <TableCell>{game.tournamentID}</TableCell>
                </TableRow>)}
                </TableBody>
            </Table>
           
            <br></br>
            <h3 style={{textDecorationLine:'underline'}}>Recent Tournaments</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: "bold"}}>Tournament ID</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Start Date</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>End Date</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Type</TableCell>
                    </TableRow>
                </TableHead>
                    
                {tournaments.map(t=> 
                    <TableRow>
                        <TableCell>{t.ID}</TableCell>
                        <TableCell>{t.name}</TableCell>
                        <TableCell>{t.startDate}</TableCell>
                        <TableCell>{t.endDate}</TableCell>
                        <TableCell>{t.type}</TableCell>
                    </TableRow>)}
            </Table>   
        </div>
    );
}
export default Home;