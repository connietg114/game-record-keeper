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
        <Link style={style} to='/'><a>LOGO</a></Link>
        <a><input type="text" placeholder="Search ..." ></input></a>
        <Link style={style} to='/'className="active">Home</Link>
        <Link style={style} to='/matches'>Matches</Link>
        <Link style={style} to='/players'>Players</Link>

        <Link style={style} to='/about'>About</Link>
        <Link style={style} to='/theresults'>TheResults</Link>
        <Link style={style} to='/login'>LogIn</Link>
        <Link style={style}> Hello Admin!</Link> {/*<Link> moves items position...need styling */}
        
    </nav>
    );
}
export default Nav;