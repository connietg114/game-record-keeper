import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const style ={
    border: '1px solid black'
}
// change css for the table

function Home(){
    var _ = require('lodash');
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
        tournamentID: '200'},

        {ID: '100',
        name: 'Connect Four',
        status: 'dontknow',
        date: '2020-02-20',
        noOfPlayers: 10,
        tournamentID: '200'},

        {ID: '100',
        name: 'Chess',
        status: 'dontknow',
        date: '2020-10-01',
        noOfPlayers: 10,
        tournamentID: '200'},
        
    ];
    for (var i = 0; i<games.length;i++){
        games= _.orderBy(games, ['date','name'], ['asc','asc']);
        console.log(games[i].name);
    }

    return(
        <div>
            <h1>Home</h1>
            <hr></hr>
            <br></br>
            <h3 style={{textDecorationLine:'underline'}}>Recent Games</h3>
            <table style={style}>
                <th style={style} >Game ID</th>
                <th style={style}>Name</th>
                <th style={style}>Status</th>
                <th style={style}>Date</th>
                <th style={style}>Number of Players</th>
                <th style={style}>Tournament ID</th>
                {games.map(game=>
                <tr style={style}>
                    <td>{game.ID}</td>
                <td>{game.name}</td>
                <td>{game.status}</td>
                <td>{game.date}</td>
                <td>{game.noOfPlayers}</td>
                <td>{game.tournamentID}</td>
                </tr>)}
            </table>
            
            
            
        </div>
    );
}
export default Home;