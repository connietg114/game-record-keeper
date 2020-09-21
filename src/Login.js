import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Login.css';

function Login(){
    const[text, setText] = useState('');   
    const [names, setNames] = useState([]);
    var submitHandler = (e) => {
        setNames(text.split('\n'));
    };

    return(
        <div>
            <h1>Log In</h1>
            <hr></hr>
        
        
        <h3>Enter competitors (one per line):</h3>
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea> {/*make textarea bigger in css*/}
        <div>
            <button onClick={submitHandler}> Submit</button> 
        
        </div>

        <table> 
            <tr>
            <th>Names </th>
            {names.map(n => <td>{n}</td>)}
            </tr>
            {names.map(n => <tr>{n}</tr>)}
            
        </table>
        </div>
        );
}
export default Login;