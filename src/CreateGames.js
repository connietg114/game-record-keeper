import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

function CreateGames(props){
    
    const[game, setGame] = useState({name: "", minPlayerCount: "",maxPlayerCount: ""}); 
    const changeHandler = (event) => {
        setGame((prevState) => ({
           ...prevState,
           [event.target.name]: event.target.value
        }));
    }
    // var changeHandler = (e) =>{
    //     setGame({[e.target.name]:e.target.value});
    // };
    var submitHandler = e =>{
        e.preventDefault();
        // console.log(name, minPlayerCount, maxPlayerCount);
    };

    var url = props.config.apiURL + 'api/game/';
    // useEffect(() => {
    // fetch(url, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title:  })
    //     })
    //     .then(response => response.json())
        
    // }, []);

    return (
        <div>
            <h1>Create Games</h1>
                <hr></hr>
                <br></br>
            <form onSubmit={submitHandler}>
                <div>
                    Name: 
                    <input type = "text" name="name" value={game.name} onChange={e => setGame({ ...game, name: e.target.value})}></input>
                    
                </div>
                <div>
                    Min. Number of Players: 
                    <input type = "text" name="minPlayerCount" value={game.minPlayerCount} onChange={e => setGame({ ...game, minPlayerCount: e.target.value})}></input>
                </div>
                <div>
                    Max. Number of Players: 
                    <input type = "text" name="maxPlayerCount" value={game.maxPlayerCount} onChange={e => setGame({...game, maxPlayerCount: e.target.value})}></input>
                </div>
                <br></br>
                <button type='submit' >Submit</button>
            </form>
            <br></br>
            
            <hr></hr>
            
        </div>
    );
}
export default CreateGames;