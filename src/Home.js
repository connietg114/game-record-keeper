import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import moment from 'moment';
import GameMatchList from './GameMatchList.js';
import TournamentList from './TournamentList';
import './Home.css';


function findStartDate(days){
    var date = new Date();
    date.setDate(date.getDate()-days);
    return moment(date).format ("YYYY-MM-DD");
}

function Home(props){

    const config = useContext(ConfigContext);
    const[gameMatches, setGameMatches] = useState([]); 
    const [gameMatchRequest, setGameMatchRequest] = useState({startDate: findStartDate(90), endDate:''});

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


    const [tournaments, setTournaments] = useState([]);
    useEffect(() => {
        var url = config.apiURL + 'api/tournament?startDate=' + findStartDate(90);
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
            .then(response => response.json())
            .then(item => {
                setTournaments(item);
            });
    }, [config.apiURL]);
    
    return(
        <div className="homePage">
            <h1>Home</h1>
            <hr></hr>
            <br></br>

            <h3 style={{textDecorationLine:'underline'}}>Recent Games</h3>
            <GameMatchList tableName = 'Recent Games' games = {gameMatches}/>
           
            <br></br>
            <h3 style={{ textDecorationLine: 'underline' }}>Recent Tournaments</h3>
            <TournamentList tableName='Recent Tournament' tournaments={tournaments} />
            
        </div>
    );
}
export default Home;