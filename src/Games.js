import React, {useState, useEffect, useContext } from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
    },
    sortingIcon:{
        display:'none'
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

    const config = useContext(ConfigContext);

    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const[games, setGames] = useState([]); 
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll]=useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal]=useState();
    
    const [sortItems, setSortItems] = useState([]);

    const tableHeaderItems=[
        {
            name: "Game ID",
            columntosort: "ID"
        },
        {
            name: "Name",
            columntosort: "Name"
        },
        {
            name: "Minimum Number of Players",
            columntosort: "MinPlayerCount"
        },
        {
            name: "Maximum Number of Players",
            columntosort: "MaxPlayerCount"
        },
        {
            name: "Number of Game Modes",
            columntosort: "GameModeCount"
        },

    ]

    const handleSorting = (columntosort) =>{
        var sortItem = columntosort;
        if(sortItem=== null){
            return ;
        }
        var sortList = [];
        for(var i = 0; i < sortItems.length; i++) {
            sortList.push(sortItems[i]);
        }
        var index;
        if(sortList.includes(sortItem)){
            index = sortList.indexOf(sortItem);
            sortList.splice(index, 1);
            sortList.push(sortItem + " desc");
        }else if (sortList.includes(sortItem+" desc")){
            index = sortList.indexOf(sortItem+ " desc");
            sortList.splice(index, 1);
            sortList.push(sortItem);
        }else if (!sortList.includes(sortItem) && !sortList.includes(sortItem+" desc")){
            sortList.push(sortItem);
        }
        setSortItems(sortList);

    };
    function checkColumnToSort(columntosort){
        if(sortItems.includes(columntosort+" desc")){
            return <ArrowDropDownIcon/>;
        }
        else if (sortItems.includes(columntosort)){
            return <ArrowDropUpIcon/>;
        }
        else{
            return null;
        }
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    function fetchGames(url){
        fetch(url, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                page: page,
                rowsPerPage: rowsPerPage,
                sortItems:sortItems
            })
            })
            .then(response => {
                 return response.json();
            })
            .then(item => {
                setGames(
                item.games.map(i=>{
                    return{
                        select: false,
                        id: i.id,
                        name: i.name,
                        minPlayerCount: i.minPlayerCount,
                        maxPlayerCount: i.maxPlayerCount,
                        gameModes: i.gameModes
                        }
                    })
                );
                setTotal(item.total);
                setIsLoaded(true);
            });

    }
    var url = config.apiURL + 'api/Games';
    useEffect(() => {
        fetchGames(url);
    }, [page, rowsPerPage, sortItems,config.apiURL]);


  
    let history = useHistory();
    const directToCreateGames= () =>{
        history.push('/creategames/');
    }

    let his = useHistory();
    function navigateToDetailsPage(id) {
        his.push('/gamedetail/' + id);
    }

    function handleDeleteTask(gameID){
        deleteGame(gameID)
            .then(message=>{
                fetchGames(url);
                alert(message)
            }
        );
    }

    function deleteGame(gameID) {
        var url = config.apiURL + 'api/game?id='+ gameID;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*' ,
            "Access-Control-Allow-Methods": "DELETE" }   
        };
        return fetch(url, requestOptions)
            .then(response =>
                response.text()
                // { if(!response.ok){return response.text()}return response.json()}
            )
            // .then(data => setErrorMessage(data))
            .catch(error => {
                console.log("Error: " + error);
            });
    }

    function handleBulkDelete(){
        let ids = [];
        for(var i = 0; i < selected.length; i++) {
            ids.push(selected[i].id);   
        }
        setGames(games.filter((game) => !selected.includes(game)));
        deleteMultipleGames(ids);
        setSelected([]);
        setSelectAll(false);
    }
    
    function deleteMultipleGames(gameList){
        var url = config.apiURL + 'api/game/deleteMultipleGames';
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
                <IconButton onClick = {handleBulkDelete}>
                    <DeleteIcon/>
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
                                    {
                                        tableHeaderItems.map((headerItem)=>
                                            <TableCell style={{fontWeight: "bold"}} onClick={() => handleSorting(headerItem.columntosort)}>
                                                {checkColumnToSort(headerItem.columntosort)}{headerItem.name}
                                            </TableCell>
                                        )
                                    }
                                <TableCell style={{fontWeight: "bold"}}></TableCell>
                                <TableCell style={{fontWeight: "bold"}}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {games
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((g,index)=>
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
                                                    _.remove(newSelected, selectedGame => selectedGame.select === false);                                                                                                                                                                           
                                            }    
                                            return game;
                                            })
                                        );                                       
                                        setSelected(newSelected);                                                                               
                                    }}/>
                                </TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{(index+1)+((page-1) * rowsPerPage + rowsPerPage)}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.id}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.name}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.minPlayerCount}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.maxPlayerCount}</TableCell>
                                <TableCell onClick={e=>navigateToDetailsPage(g.id)}>{g.gameModes}</TableCell>
                                <TableCell>
                                    <IconButton onClick={e=> {handleDeleteTask(g.id)}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell><IconButton><EditIcon /></IconButton></TableCell>
                        </TableRow> )}
                        {/* {games.map((g, index)=> 
                            <GameRow key={index} game={g} games={games}/>)} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
            </Paper>
            
            
        </div>
        
    );
}
export default Games;
