import React from 'react';
import ReactDOM from 'react-dom';
import './Nav.css';
import {Link} from 'react-router-dom';

function Nav(){
    const style ={
        color:'black'
    };
    return(
        <nav className="topnav">
        <Link style={style} to='/'>LOGO</Link>
        
        <Link style={style} to='/'className="active">Home</Link>
        <Link style={style} to='/matches'>Matches</Link>
        <Link style={style} to='/players'>Players</Link>

        <Link style={style} to='/about'>About</Link>
        <Link style={style} to='/theresults'>TheResults</Link>
        
        
    </nav>
    );
}
export default Nav;