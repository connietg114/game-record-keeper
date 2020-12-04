import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import './CreateGames.css';

import CreateNewGame from './UpdateGame.js';

function getSteps() {
    return ['Create game ', 'Add Game Mode(s)', 'Review and Submit'];
}
  
function CreateGames(props){
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
        ></CreateNewGame>
    );
}
export default CreateGames;