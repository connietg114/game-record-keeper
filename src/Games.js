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
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    table: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      margin: -1,
      overflow: 'hidden',
      padding: 0,
    },
    title: {
        flex: '1 1 100%',
      }
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
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll]=useState(false);

    useEffect(() => {
        var url = props.config.apiURL + 'api/game/';
        fetch(url, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json',}
            })
            .then(response => response.json())
            .then(item => {
                setGames(
                item.map(i=>{
                    return{
                        select: false,
                        id: i.id,
                        minPlayerCount: i.minPlayerCount,
                        maxPlayerCount: i.maxPlayerCount,
                        gameModes: i.gameModes
                        }
                    })
                );
                
                setIsLoaded(true);
            });
    }, []);
  
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
            .then(response => {return response.json();})
            .then(data => {})
            .catch(error => {
                console.log(error);
            });
            // .then(data => setPostId(data.id));
    }

    function handleBulkDelete(){
        let ids = [];
        for(var i = 0; i < selected.length; i++) {
            ids.push(selected[i].id);   
        }
        setGames(games.filter((game) => !selected.includes(game)));
        // setGames(games.map(g=>{
        //     g.select=false;
        //     return g;
        // }))
        deleteMultipleGames(ids);
        setSelected([]);
        setSelectAll(false);
    }
    
    function deleteMultipleGames(gameList){
        var url = props.config.apiURL + 'api/game/deleteMultipleGames';
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*' ,
            "Access-Control-Allow-Methods": "DELETE" },
            body: JSON.stringify(gameList)
        };
        fetch(url, requestOptions)
            .then(response => {return response.json();})
            .then(data => {})
            .catch(error => {console.log(error);});
    }

    if (!isLoaded)
        return null;
    
    return(
        <div>
            {selected.length > 0?
            (<Typography variant="h6" color="inherit">Delete {selected.length} games selected
                <IconButton>
                    <DeleteIcon onClick = {handleBulkDelete}/>
                </IconButton>
            </Typography>
            ):(
            <h1>Games</h1> )}

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
                                <TableCell>
                                    <Checkbox checked ={selectAll} onChange={e=>{
                                        let checked = e.target.checked;
                                        setSelectAll(e.target.checked);
                                        setGames(games.map(g=>{
                                            g.select=checked;
                                            return g;
                                        }))
                                        if(e.target.checked){
                                            let newSelected=games.map(g=>g);
                                            setSelected(newSelected);
                                        }
                                        else{
                                            setSelected([]);
                                        }}}/>
                                    </TableCell>
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
                                <TableCell>
                                    <Checkbox checked={g.select} onChange={(e)=>{
                                        setSelectAll(false);
                                        let checked=e.target.checked;
                                        var newSelected = [];
                                        setGames(
                                            games.map(game=>{
                                            if(g.id===game.id){
                                                game.select=checked; 
                                                    for(var i = 0; i < selected.length; i++) {
                                                        newSelected.push(selected[i]);
                                                    }
                                                    newSelected.push(g);
                                                    _.remove(newSelected, selectedGame => selectedGame.select == false);                                                                                                                                                                           
                                            }    
                                            return game;
                                            })
                                        );                                       
                                        setSelected(newSelected);                                                                               
                                    }}/>
                                </TableCell>
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
