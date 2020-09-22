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
import _ from 'lodash';
import TournamentList from './TournamentList';


function findStartDate(days){
    var date = new Date();
    date.setDate(date.getDate()-days);
    return moment(date).format ("YYYY-MM-DD");
}

function Home(props){

    const[games, setGames] = useState([]); 
    useEffect(() => {
    var url = props.config.apiURL + 'api/gameMatch?startDate=' + findStartDate(90);
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGames(item);
        });
    }, []);

    const [tournaments, setTournaments] = useState([]);
    useEffect(() => {
        var url = props.config.apiURL + 'api/tournament?startDate=' + findStartDate(90);
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
            .then(response => response.json())
            .then(item => {
                setTournaments(item);
            });
    }, []);
    
    // games= _.orderBy(games, ['date','name'], ['asc','asc']); //sort by date then name
    
    //var tournaments = [
    //    {ID: '100',
    //    name: 'Go',
    //    startDate: '2019-03-04',
    //    endDate:'2020-01-02',
    //    type:'null'}]
 

    return(
        <div>
            <h1>Home</h1>
            <hr></hr>
            <br></br>

            <h3 style={{textDecorationLine:'underline'}}>Recent Games</h3>
            <GameMatchList tableName = 'Recent Games' games = {games}/>
           
            <br></br>
            <h3 style={{ textDecorationLine: 'underline' }}>Recent Tournaments</h3>
            <TournamentList tableName='Recent Tournament' tournaments={tournaments} />
            
        </div>
    );
}
export default Home;