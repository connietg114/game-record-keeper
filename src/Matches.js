import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import ConfigContext from './ConfigContext';
import GameMatchList from './GameMatchList.js';
import _ from 'lodash';
import AddIcon from '@material-ui/icons/Add';
// import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// import EditIcon from '@material-ui/core/icons/Edit'; --> Can't resolve '@material-ui/core/icons/Edit'
function Matches(props){
    const config = useContext(ConfigContext);
    const[gameMatches, setGameMatches] = useState([]);
    const [gameMatchRequest, setGameMatchRequest] = useState({startDate: '', endDate:''});

    function fetchGameMatches(url){
        fetch(url, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                gameMatchRequest: gameMatchRequest
                })
            })
            .then(response => {return response.json();})
            .then(item => {setGameMatches(item);});    
    }

    var url = config.apiURL + 'api/gameMatch/';
    useEffect(() => { 
        fetchGameMatches(url);
    }, [config.apiURL]);
    
    function deleteMatch(gameMatchID) {
        var url = config.apiURL + 'api/gameMatch?id='+ gameMatchID;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*' ,
            "Access-Control-Allow-Methods": "DELETE" }   
        };
        return fetch(url, requestOptions)
            .then(response => response.text())
            .catch(error => {console.log("GameMatch Error: " + error);});
    }

    function handleDelete(id) {
        deleteMatch(id).then(message=>{
            fetchGameMatches(url);
            alert(message)});
        

    }

    
    let creategamematch = useHistory();
    function directToCreateGameMatch(){
        creategamematch.push('/creategamematch/');
    }

    return(
        <div>
            <div>
                <h1>Matches</h1>
                <Button color="primary" variant="contained" onClick = {directToCreateGameMatch}>
                    <AddIcon/><p>Add Game Match</p>
                </Button>
            </div>
            <hr></hr>
            <br></br>
            <input type="text" placeholder="Search for matches..." ></input>
            <br></br>
            <br></br>
            <GameMatchList games = {gameMatches} onDelete={handleDelete} delete={true} edit={true}/>
        </div>
    );
}
export default Matches;