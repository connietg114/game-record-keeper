import React from 'react';
import ReactDOM from 'react-dom';
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
    return(
        <div>
            <h1>Matches</h1>
            <hr></hr>
            <br></br>
            <input type="text" placeholder="Search for matches..." ></input>
            <br></br>
            <br></br>
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
export default Matches;