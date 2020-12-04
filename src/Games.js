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
import TextField from '@material-ui/core/TextField';

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

function Games (props){
    let creategamespage = useHistory();
    const directToCreateGames= () =>{
        creategamespage.push('/creategames/');
    }

    let gamedetailpage = useHistory();
    function navigateToDetailsPage(id) {
        gamedetailpage.push('/game/' + id);
    }

    let editGamePage = useHistory();
    const directToEditGamePage= (id) =>{
        editGamePage.push('/gamedetail/' + id + '/edit');
    }



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

    const [minPlayerCountMin, setMinPlayerCountMin]=useState(undefined || '');
    const [minPlayerCountMax, setMinPlayerCountMax]=useState(undefined || '');
    const [maxPlayerCountMin, setMaxPlayerCountMin]=useState(undefined || '');
    const [maxPlayerCountMax, setMaxPlayerCountMax]=useState(undefined || '');
    const[gameModeCountMin, setGameModeCountMin]=useState(undefined || '');
    const[gameModeCountMax, setGameModeCountMax]=useState(undefined || '');
    const [name, setName]=useState(undefined || '');

    const tableHeaderItems=[
        {
            name: "Game ID",
            columnName: "ID",
            type: "number"
            
        },
        {
            name: "Name",
            columnName: "Name",
            type: "text",
            filterCol: name,
            setNameValue: setName
        },
        {
            name: "Minimum Number of Players",
            columnName: "MinPlayerCount",
            type: "number",
            minFilterCol: minPlayerCountMin,
            maxFilterCol: minPlayerCountMax,
            setMinValue: setMinPlayerCountMin,
            setMaxValue: setMinPlayerCountMax
        },
        {
            name: "Maximum Number of Players",
            columnName: "MaxPlayerCount",
            type: "number",
            minFilterCol: maxPlayerCountMin,
            maxFilterCol: maxPlayerCountMax,
            setMinValue: setMaxPlayerCountMin,
            setMaxValue: setMaxPlayerCountMax
        },
        {
            name: "Number of Game Modes",
            columnName: "GameModeCount",
            type: "number",
            minFilterCol: gameModeCountMin,
            maxFilterCol: gameModeCountMax,
            setMinValue: setGameModeCountMin,
            setMaxValue: setGameModeCountMax
        },

    ]
    var filterList = [];
    const handleFilter = ()=>{
        if(minPlayerCountMin!== undefined && minPlayerCountMin!==""){
            filterList.push(`MinPlayerCount min ${minPlayerCountMin}`);
        }
        if(minPlayerCountMax!== undefined && minPlayerCountMax!==""){
            filterList.push(`MinPlayerCount max ${minPlayerCountMax}`);
        }
        if(maxPlayerCountMin!== undefined && maxPlayerCountMin!==""){
            filterList.push(`MaxPlayerCount min ${maxPlayerCountMin}`);
        }
        if(maxPlayerCountMax!== undefined && maxPlayerCountMax!==""){
            filterList.push(`MaxPlayerCount max ${maxPlayerCountMax}`);
        }if(gameModeCountMin!==undefined && gameModeCountMin!==""){
            filterList.push(`GameModeCount min ${gameModeCountMin}`);
        }
        if(gameModeCountMax!==undefined && gameModeCountMax!==""){
            filterList.push(`GameModeCount max ${gameModeCountMax}`);
        }
        if(name!==undefined && name!==""){
            filterList.push(`Name ${name}`);
        }
        return filterList;
        // console.log(filterList);
        
    }

    const handleSorting = (columnName) =>{
        var sortItem = columnName;
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
                sortItems:sortItems,
                filterItems: handleFilter()
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
    }, [page, rowsPerPage, sortItems, config.apiURL,
        name, 
        minPlayerCountMax, minPlayerCountMin, 
        maxPlayerCountMax, maxPlayerCountMin, 
        gameModeCountMax, gameModeCountMin]);

    
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
        // setGames(games.filter((game) => !selected.includes(game)));
        deleteMultipleGames(ids)
        .then(message=>{
            fetchGames(url);
            alert(message);
        }
    );
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
        return fetch(url, requestOptions)
            .then(response => 
                response.text()
                // if(response.ok){setSelected([]);}    
            )
            .catch(error => {console.log(error);}
            );
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
                <AddIcon/><Typography variant="body1">Add Game</Typography>
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
                                        tableHeaderItems.map((headerItem, index)=>
                                            <TableCell key={index}>
                                                <Typography style={{fontWeight: "bold"}} 
                                                    onClick={() => handleSorting(headerItem.columnName)}>
                                                    {checkColumnToSort(headerItem.columnName)}{headerItem.name}
                                                </Typography>
                                                {headerItem.columnName === "Name"? 
                                                (<input value={headerItem.filterCol}onChange={(e)=>headerItem.setNameValue(e.target.value)}></input>):
                                                (!headerItem.columnName==="ID"?(null):

                                                    (<div>
                                                        <div>
                                                            <TextField id="standard-number" label="Min" InputLabelProps={{ shrink: true,}}
                                                                value={headerItem.minFilterCol}
                                                                
                                                                onChange={(e)=>headerItem.setMinValue(e.target.value)} 
                                                                type={headerItem.type}>
                                                            </TextField>
                                                        </div>
                                                        <div>
                                                            <TextField id="standard-number" label="Max" InputLabelProps={{ shrink: true,}}
                                                                value={headerItem.maxFilterCol}
                                                                onChange={(e)=>headerItem.setMaxValue(e.target.value)} 
                                                                type={headerItem.type}>
                                                            </TextField>
                                                        </div>
                                                    </div>
                                                    ))}
  
                                            </TableCell>
                                        )
                                    }
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {games.length === 0?  
                            (<TableRow> 
                                <TableCell style={{textAlign: "center",fontWeight: "bold"}} colSpan={tableHeaderItems.length+4}>
                                No Records Available
                                </TableCell>
                            </TableRow>): 
                            games.map((g,index)=>
                            <TableRow type="button" key={index} hover >
                                <TableCell>
                                    <Checkbox 
                                        checked={g.select} 
                                        onChange={(e)=>{
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
                                    <IconButton onClick={e=> {handleDeleteTask(g.id)}}><DeleteIcon/></IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={e=>directToEditGamePage(g.id)}><EditIcon /></IconButton>
                                </TableCell>
                            </TableRow> )}
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
