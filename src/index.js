import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Row from './createTable';
import _ from 'lodash';
import Nav from './Nav.js';
import Home from './Home.js';
import About from './About.js';
import Login from './Login.js';
import Theresults from './Theresults.js';
import Matches from './matches.js';
import Players from './players.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//import 'bootstrap/dist/css/bootstrap.min.css';
// import { ReactComponent } from '*.svg';

function App(){
    
    return(
        <Router>
        <div>           
            <Nav/>
            <Switch> {/* after detect '/', then stop - Home */}
                <Route path ='/' exact component={Home}/> {/*put exact so that / works for Home only*/}
                <Route path='/matches' component={Matches}/>
                <Route path='/players' component={Players}/>
                <Route path='/about' component={About}/>
                <Route path='/theresults' component={Theresults}/>
                <Route path='/login' component={Login}/>
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

ReactDOM.render( <App/>, document.getElementById('root'));