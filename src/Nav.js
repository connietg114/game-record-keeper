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
        <Link style={style} to='/'><a  className="active">Home</a></Link>
        <Link style={style} to='/about'><a >About</a></Link>
        <Link style={style} to='/theresults'><a >TheResults</a></Link>
        <Link style={style} to='/login'><a >LogIn</a></Link>
        <Link style={style}> <a>Hello Admin!</a></Link> {/*<Link> moves items position...need styling */}
        
    </nav>
    );
}
export default Nav;