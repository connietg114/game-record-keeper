import React from 'react';
import ReactDOM from 'react-dom';
import './Nav.css';
import {Link} from 'react-router-dom';

function Nav(){
    const style ={
        color:'black'
    };
    const imgStyle={
        height: '30px',
        width: '30px'
    };
    return(
        <nav className="topnav">
        <Link style={style} to='/'><img style = {imgStyle} src='./logo192.png' ></img> </Link>
        
        <Link style={style} to='/'className="active">Home</Link>
        <Link style={style} to='/matches'>Matches</Link>
        <Link style={style} to='/players'>Players</Link>

        <Link style={style} to='/about'>About</Link>
        
        
        
    </nav>
    );
}
export default Nav;