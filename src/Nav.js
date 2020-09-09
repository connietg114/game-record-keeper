import React from 'react';
import ReactDOM from 'react-dom';
import './Nav.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';

function TopNavBar(){
    const style ={
        color:'black'
    };
    const imgStyle={
        height: '30px',
        width: '30px'
    };
    return(
        <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
            <img style = {imgStyle} src='./logo192.png' ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link  className="active" href="/">Home</Nav.Link>
            <Nav.Link href="/tournaments">Tournaments</Nav.Link>
            <Nav.Link href="/matches">Matches</Nav.Link>
            <Nav.Link href="/games">Games</Nav.Link>
            <Nav.Link href="/players">Players</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>

      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
  </Navbar.Collapse>
</Navbar>



    <nav className="topnav">
    <Link style={style} to='/'><img style = {imgStyle} src='./logo192.png' ></img> </Link>
    <Link style={style} to='/'className="active">Home</Link>
    <Link style={style} to='/tournaments'>Tournaments</Link>
    <Link style={style} to='/matches'>Matches</Link>
    <Link style={style} to='/games'>Games</Link>
    <Link style={style} to='/players'>Players</Link>
    <Link style={style} to='/about'>About</Link>    
    </nav> 
    </div>
    );
}
export default TopNavBar;