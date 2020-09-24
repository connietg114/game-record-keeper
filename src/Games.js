import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    table: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      margin: -1,
      overflow: 'hidden',
      padding: 0,
    },
  }));

  

// function GameRow(props) {
//     let history = useHistory();
//     function navigateToDetailsPage() {
//         history.push('/gamedetail/' + props.game.id);
//     }

//     const games = props;

//     return (
        
//     <TableRow type="button" hover>
//         <TableCell onClick={navigateToDetailsPage}>{props.game.id}</TableCell>
//         <TableCell onClick={navigateToDetailsPage}>{props.game.name}</TableCell>
//         <TableCell onClick={navigateToDetailsPage}>{props.game.minPlayerCount}</TableCell>
//         <TableCell onClick={navigateToDetailsPage}>{props.game.maxPlayerCount}</TableCell>
//         <TableCell onClick={navigateToDetailsPage}>{props.game.gameModes}</TableCell>
//         <TableCell>
//             <IconButton>
//                 <DeleteIcon onClick={e=> {handleDeleteTask(props.game.id)}}/>
//             </IconButton>
//             {/* <DeleteButton id={props.game.id}></DeleteButton> */}
//         </TableCell>
//         <TableCell><IconButton><EditIcon /></IconButton></TableCell>
//     </TableRow> 
    
//     );
// }




function Games (props){
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const[games, setGames] = useState([]); 

    useEffect(() => {
        var url = props.config.apiURL + 'api/game/';
        fetch(url, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json',}
            })
            .then(response => response.json())
            .then(item => {
                setGames(item);
                setIsLoaded(true);
            });
    }, []);
    console.log("Before: " + games.length);
    let history = useHistory();
    const directToCreateGames= () =>{
        history.push('/creategames/');
    }

    let his = useHistory();
    function navigateToDetailsPage(id) {
        his.push('/gamedetail/' + id);
    }

    function handleDeleteTask(gameID){
        var newGames = [...games];
        _.remove(newGames, game => game.id == gameID)
        setGames(newGames);
        deleteGame(gameID);
        // console.log("After: " + games.length);
    }

    function deleteGame(gameID) {
        var url = props.config.apiURL + 'api/game?id='+ gameID;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*' ,
            "Access-Control-Allow-Methods": "DELETE" }   
        };
        fetch(url, requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {

            })
            .catch(error => {
                console.log(error);
            });
            // .then(data => setPostId(data.id));
    }



    if (!isLoaded)
        return null;
    
    return(
        <div>
            <h1>Games</h1> 
            <IconButton onClick = {directToCreateGames}>
                <AddIcon/><Typography variant="body1">Add Games</Typography>
            </IconButton>
            <hr></hr>
            <br></br>
            <Paper>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                            <TableCell style={{fontWeight: "bold"}}> No. </TableCell>
                                <TableCell style={{fontWeight: "bold"}}> Game ID </TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Number of Minimum Players</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Number of Maximum Players</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Number of Game Mode</TableCell>
                                <TableCell style={{fontWeight: "bold"}}></TableCell>
                                <TableCell style={{fontWeight: "bold"}}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {games.map((g,index)=>
                            <TableRow type="button" hover>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{index+1}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.id}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.name}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.minPlayerCount}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.maxPlayerCount}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.gameModes}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <DeleteIcon onClick={e=> {handleDeleteTask(g.id)}}/>
                                    </IconButton>
                                    {/* <DeleteButton id={props.game.id}></DeleteButton> */}
                                </TableCell>
                                <TableCell><IconButton><EditIcon /></IconButton></TableCell>
                        </TableRow> )}
                        {/* {games.map((g, index)=> 
                            <GameRow key={index} game={g} games={games}/>)} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            
            
        </div>
        
    );
}
export default Games;
