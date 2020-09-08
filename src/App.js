import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import TopNavBar from './Nav.js';
import Home from './Home.js';
import About from './About.js';
import Theresults from './Theresults.js';
import Matches from './Matches.js';
import Players from './Players.js';
import GameDetail from './GameDetail.js';
import Tournaments from './Tournaments.js';
import Games from './Games.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EnhancedTable from './draft';

function App(props){
    
    const [config, setConfig] = useState({});

    fetch('/config.json', {
        method: 'GET', 
        headers: {'Content-Type': 'application/json',}
    })
    .then(response => response.json())
    .then(data => setConfig(data)); 

    return(
        <Router>
        <div>           
            <TopNavBar/>
            <Switch> {/* after detect '/', then stop - Home */}
                <Route path='/' exact render={routeProps => (<Home {...routeProps} config={config}/>)}/> {/*put exact so that / works for Home only*/}
                <Route path='/tournaments' component={Tournaments}/>
                <Route path='/matches' exact render={routeProps => (<Matches {...routeProps} config={config}/>)}/>
                {/* <Route path='/matches' component={Matches}/> */}
                <Route path='/games' component={Games}/>
                <Route path='/players' component={Players}/>
                <Route path='/about' component={About}/>
                <Route path='/theresults' component={Theresults}/>
                <Route path='/gamedetail' render={routeProps => (<GameDetail {...routeProps} config={config}/>)}/>
                <Route path='/draft' component={EnhancedTable}/>
            </Switch>
            </div> 
        </Router>                  
    );   
}
// const Home = () => (
//     <div>
//         <h1>Home</h1>
//     </div>
// );


export default App;