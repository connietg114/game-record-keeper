import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import './CreateGames.css';
import { useHistory } from "react-router-dom";
import CreateNewGame from './UpdateGame.js';

function getSteps() {
    return ['Create game ', 'Add Game Mode(s)', 'Review and Submit'];
}
  
function CreateGames(props){
    const config = useContext(ConfigContext);
    const [id, setId] = useState('');
    const [gameName, setGameName] = useState('');
    const [minPlayer, setMinPlayer] = useState('');
    const [maxPlayer, setMaxPlayer] = useState('');
    const gmInitialState = {
        name:'Standard',
        description: '',
        winConditionID: 1
    };
    const [gameModes, setGameModes] = useState([gmInitialState]);
    const steps = getSteps();
    const suceessMessage = " has been added successfully!";

    function post(gameName, minPlayer, maxPlayer, gameModes) {
        var url = config.apiURL + 'api/game/';
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Name: gameName,
                MinPlayerCount: minPlayer,
                MaxPlayerCount: maxPlayer,
                GameModeItems: gameModes
             })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(message => directToEditGamePage(message.game.id))
            .catch(error => {
                console.log(error);
            });
    }
    function setInitialState(){
        setGameName('');
        setMinPlayer('');
        setMaxPlayer('');
        setGameModes([gmInitialState]);
    }

    let editGamePage = useHistory();
    const directToEditGamePage= (id) =>{
        editGamePage.push('/game/' + id + '/edit');
    }
    return(
        <CreateNewGame
            title="Create Game"
            steps={steps}
            gameName={gameName}
            setGameName={setGameName}
            minPlayer={minPlayer}
            setMinPlayer={setMinPlayer}
            maxPlayer={maxPlayer}
            setMaxPlayer={setMaxPlayer}
            gameModes={gameModes}
            setGameModes={setGameModes}
            gmInitialState = {gmInitialState}
            post={post}
            suceessMessage={suceessMessage}
            setInitialState = {setInitialState}
            // directTo={directToEditGamePage}
        ></CreateNewGame>
    );
}
export default CreateGames;