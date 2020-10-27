import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import TopNavBar from './Nav.js';
import Home from './Home.js';
import About from './About.js';
import Theresults from './Theresults.js';
import Matches from './Matches.js';
import Players from './Players.js';
import GameMatchDetail from './GameMatchDetail.js';
import GameDetail from './GameDetail.js';
import Tournaments from './Tournaments.js';
import Games from './Games.js';
import CreateGames from './CreateGames.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EnhancedTable from './draft';
import TournamentDetail from './TournamentDetail.js';
import { useConfig } from './useConfig';
import { ConfigProvider } from './ConfigContext.js';

function App(props){
    
    const config = useConfig();
    
    if (config === null)
        return null;

    return(
        <Router>
            <ConfigProvider value={config} >
                <div>
                    
                    <TopNavBar/>
                    <Switch> {/* after detect '/', then stop - Home */}
                        <Route path='/' exact render={routeProps => (<Home {...routeProps}/>)}/> {/*put exact so that / works for Home only*/}
                            <Route path='/tournaments' exact render={routeProps => (<Tournaments {...routeProps} />)}/>
                        <Route path='/matches' exact render={routeProps => (<Matches {...routeProps} />)}/>
                        <Route path='/games' exact render={routeProps => (<Games {...routeProps} />)}/>
                        <Route path='/players' component={Players}/>
                        <Route path='/about' component={About}/>
                        <Route path='/theresults' component={Theresults}/>
                        <Route path='/gamematchdetail' render={routeProps => (<GameMatchDetail {...routeProps} />)}/>
                        <Route path='/gamedetail' render={routeProps => (<GameDetail {...routeProps}/>)}/>
                        <Route path='/creategames' render={routeProps => (<CreateGames {...routeProps}/>)}/>
                        <Route path='/draft' component={EnhancedTable} />
                        <Route path='/tournamentdetail' render={routeProps => (<TournamentDetail {...routeProps} />)} />
                    </Switch>
                </div> 
            </ConfigProvider>
        </Router>                  
    );   
}
// const Home = () => (
//     <div>
//         <h1>Home</h1>
//     </div>
// );


export default App;