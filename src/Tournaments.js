import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TournamentList from './TournamentList.js';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { useHistory } from "react-router-dom";
import _ from 'lodash';

function Tournaments (props){
    const [tournaments, setTournaments] = useState([]);
    useEffect(() => {
        var url = props.config.apiURL + 'api/tournament/';
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
            .then(response => response.json())
            .then(item => {
                setTournaments(item);
            });
    }, []);

    function handleDelete(id) {
        console.log('deleting ' + id);
        // var evens = _.remove(array, function(n) {
        //     return n % 2 == 0;
        //   });
        setTournaments([]);
    }

    return (
        <div>
            <h1>Tournaments</h1>
            <hr></hr>
            <br></br>
            <input type="text" placeholder="Search for tournaments..." ></input>
            <br></br>
            <br></br>
            <TournamentList tournaments={tournaments} onDelete={handleDelete} />
        </div>
    );
}
export default Tournaments;
