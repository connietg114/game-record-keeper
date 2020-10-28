import React, {useState} from 'react';
import './Theresults.css';

function Theresults(){
    const [players, setPlayers]=useState([]);//[connie]
    const[text, setText] = useState('');//connie

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
   
    return(
        <div>
            <h1>The Results (draft content)</h1>
            <hr></hr>
            <input name="newPlayerName" value={text} onChange={e => setText(e.target.value)}></input>
            <button onClick={addPlayer}>Add Player</button>
            
            <h3>Form a Table below:</h3>
            <table>
            
            {
                players.map(p => (

                <tr>
                    <td>{p}</td>
                    <td>
                        <button id='playerName'>Remove</button>
                                   
                    </td>
                </tr>))
                
            }
        
            </table>
        </div>
        
    );
}
export default Theresults;