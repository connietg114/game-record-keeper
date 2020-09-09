import React from 'react';
import ReactDOM from 'react-dom';
import './Nav.css';
import {Link} from 'react-router-dom';

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListIcon from '@material-ui/icons/List';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { spacing } from "@material-ui/system";

//material ui starts
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      [theme.breakpoints.down("xs")]: {
        flexGrow: 1
      },
      margin: theme.spacing(1),
      marginTop: theme.spacing(1.5)
    },
    headerOptions: {
      display: "flex",
      flex: 1,
      
    //   justifyContent: "space-evenly"
    },
    headerOptionsButton:{
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
  }));

function TopNavBar(props){
    const style ={
        color:'black'
    };
    const imgStyle={
        height: '30px',
        width: '30px',
       
    };

    let history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClick = pageURL => {
      history.push(pageURL);
      setAnchorEl(null);
    };
  
    const handleButtonClick = pageURL => {
      history.push(pageURL);
    };
  
    const menuItems = [
      {
        menuTitle: "Home",
        pageURL: "/"
      },
      {
        menuTitle: "Tournaments",
        pageURL: "/tournaments"
      },
      {
        menuTitle: "Matches",
        pageURL: "/matches"
      },
      {
        menuTitle: "Games",
        pageURL: "/games"
      },
      {
        menuTitle: "Players",
        pageURL: "/players"
      },
      {
        menuTitle: "About",
        pageURL: "/about"
      },


    ];
    return(
        <div>
            <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => handleButtonClick("/")}>
          <img style = {imgStyle} src='./logo192.png' ></img>
          </Typography>{isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
            <Button className={classes.headerOptionsButton} color="inherit" onClick={() => handleButtonClick("/")}>
                Home
              </Button>
              <Button className={classes.headerOptionsButton} color="inherit" onClick={() => handleButtonClick("/tournaments")}>
              Tournaments
              </Button>
              <Button className={classes.headerOptionsButton} color="inherit" onClick={() => handleButtonClick("/matches")}>
              Matches
              </Button>
              <Button className={classes.headerOptionsButton} color="inherit" onClick={() => handleButtonClick("/games")}>
              Games
              </Button>
              <Button className={classes.headerOptionsButton} color="inherit" onClick={() => handleButtonClick("/players")}>
              Players
              </Button>
              <Button className={classes.headerOptionsButton} color="inherit" onClick={() => handleButtonClick("/about")}>
              About
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>




    {/* <nav className="topnav">
    <Link style={style} to='/'><img style = {imgStyle} src='./logo192.png' ></img> </Link>
    <Link style={style} to='/'className="active">Home</Link>
    <Link style={style} to='/tournaments'>Tournaments</Link>
    <Link style={style} to='/matches'>Matches</Link>
    <Link style={style} to='/games'>Games</Link>
    <Link style={style} to='/players'>Players</Link>
    <Link style={style} to='/about'>About</Link>    
    </nav>  */}
    </div>
    );
};
export default TopNavBar;