import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import GameMatchList from './GameMatchList.js';
import _ from 'lodash';

// import EditIcon from '@material-ui/core/icons/Edit'; --> Can't resolve '@material-ui/core/icons/Edit'
function Matches(props){
    
    const config = useContext(ConfigContext);

    const[games, setGames] = useState([]);
    useEffect(() => {
    var url = config.apiURL + 'api/gameMatch/';
    fetch(url, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
        })
        .then(response => response.json())
        .then(item => {
        setGames(item);
        });
    }, [config.apiURL]);

    // function deleteMatch(gameID) {
    //     var url = props.config.apiURL + 'api/game?id='+ gameID;
    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin' : '*' ,
    //         "Access-Control-Allow-Methods": "DELETE" }   
    //     };
    //     fetch(url, requestOptions)
    //         .then(response => {
    //             return response.json();
    //         })
    //         .then(data => {

    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

 
    function handleDelete(id) {
        console.log('deleting ' + id);
        var newGames = [...games];
        _.remove(newGames, game => game.id === id)
        setGames(newGames);
    }

    return(
        <div>
            <h1>Matches</h1>
            <hr></hr>
            <br></br>
            <input type="text" placeholder="Search for matches..." ></input>
            <br></br>
            <br></br>
            <GameMatchList games = {games} onDelete={handleDelete} delete={true}/>
        </div>
    );
}
export default Matches;