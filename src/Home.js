import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { useHistory } from "react-router-dom";
import GameMatchList from './GameMatchList.js';
import Toolbar from '@material-ui/core/Toolbar';

function Home(props){
    var _ = require('lodash');//do we need this?

    const[games, setGames] = useState([]); 
    var url = props.config.apiURL + 'api/gameMatch/';
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGames(item);
        });
    
    // games= _.orderBy(games, ['date','name'], ['asc','asc']); //sort by date then name
    
    var tournaments = [
        {ID: '100',
        name: 'Go',
        startDate: '2019-03-04',
        endDate:'2020-01-02',
        type:'null'}]
 

    return(
        <div>
            <h1>Home</h1>
            <hr></hr>
            <br></br>

            <h3 style={{textDecorationLine:'underline'}}>Recent Games</h3>
            <GameMatchList tableName = 'Recent Games' games = {games}/>
           
            <br></br>
            <h3 style={{textDecorationLine:'underline'}}>Recent Tournaments</h3>
            <Paper>
        <TableContainer>
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
                    <TableRow hover>
                        <TableCell>{t.ID}</TableCell>
                        <TableCell>{t.name}</TableCell>
                        <TableCell>{t.startDate}</TableCell>
                        <TableCell>{t.endDate}</TableCell>
                        <TableCell>{t.type}</TableCell>
                    </TableRow>)}
            </Table>  
            </TableContainer>
            </Paper> 
        </div>
    );
}
export default Home;