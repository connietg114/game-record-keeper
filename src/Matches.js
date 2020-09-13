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
import { useHistory } from "react-router-dom";
import GameMatchList from './GameMatchList.js';

// import EditIcon from '@material-ui/core/icons/Edit'; --> Can't resolve '@material-ui/core/icons/Edit'
function Matches(props){
    
    const[games, setGames] = useState([]);
    useEffect(() => {
    var url = props.config.apiURL + 'api/gameMatch/';
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGames(item);
        });
    }, []);
 
    return(
        <div>
            <h1>Matches</h1>
            <hr></hr>
            <br></br>
            <input type="text" placeholder="Search for matches..." ></input>
            <br></br>
            <br></br>
            <GameMatchList games = {games}/>
        </div>
    );
}
export default Matches;