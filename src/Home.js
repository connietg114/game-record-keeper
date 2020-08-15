import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Home(){
    
    const [players, setPlayers]=useState([]);
    const[text, setText] = useState('');

    var addPlayer = () => {
        if (text === '') {
            alert('No name');
            return;
        }
        var playerList = [];

        for(var i = 0; i < players.length; i++) {
            playerList.push(players[i]);
        }
        playerList.push(text);
        setPlayers(playerList);
        setText('');
    }
   
    var result = [
        {
            "date:": '2020-04-01',
            "gameType": 'Tennis'
        }
    ];

    return(
        <div>
            <h1>Home</h1>
            <hr></hr>
            <input name="newPlayerName" value={text} onChange={e => setText(e.target.value)}></input>
            <button onClick={addPlayer}>Add Player</button>
            <h3>Form a Table below:</h3>
            <table>
            
            {
                players.map(p => (<tr><td><input type="text" value={p}></input></td><td><button>Remove</button></td></tr>))
            }
        
            </table>
            </div>
    );
}
export default Home;