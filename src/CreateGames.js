import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import './CreateGames.css';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import _ from 'lodash';


const useStyles = makeStyles((theme) => ({
    root: {
    //   width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%", 
        boxSizing: "border-box"
    },
    textfield:{
        width: "100%", 
        boxSizing: "border-box"
    },
    tableCell:{
        padding: "5px", 
        textAlign: "center"
    }
  }));
  
function getSteps() {
return ['Create game ', 'Add Game Mode(s)', 'Review and Submit'];
}

function GameModeRow(props){

    return (
        
        <TableRow>
            <TableCell className={props.classes.tableCell}>{props.index+1}</TableCell>

            <TableCell className={props.classes.tableCell}>
                <TextField variant="outlined" label="Required" className={props.classes.textfield}
                    value={props.gameMode.name} 
                    onChange={e => props.onChange(props.index, { ...props.gameMode, name:e.target.value})}
                    required={true}
                ></TextField>
            </TableCell>  

            <TableCell className={props.classes.tableCell}>
                <TextField variant="outlined" label="Required" className={props.classes.textfield}
                    value={props.gameMode.description} 
                    onChange={e => props.onChange(props.index, { ...props.gameMode, description: e.target.value })}
                    required={true}>
                </TextField>
            </TableCell>  

            <TableCell style={{padding: "5px"}}>
                <FormControl variant="outlined" style={{width: "100%", boxSizing: "border-box"}} className={props.classes.formControl}>
                    <Select
                        value={props.gameMode.winConditionID} 
                        onChange={e => props.onChange(props.index, { ...props.gameMode, winConditionID: e.target.value })}
                        
                    >
                    {props.winConditionList.map((winCon, index)=>
                    <MenuItem key={index} value={winCon.id}>{winCon.id}) {winCon.name} : {winCon.description}</MenuItem>
                    )}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell style={{padding: "5px", textAlign: "center"}}>
                <IconButton onClick={()=>props.onDeleteGameModeRow(props.indexForDelete)}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>  
            <TableCell style={{padding: "5px", textAlign: "center"}}>
                <IconButton onClick={props.onAddGameModeRow}>
                    <AddIcon/>
                </IconButton>
            </TableCell>  
        </TableRow>
    )
}
  
  
function CreateGames(props){
    const config = useContext(ConfigContext);
    const [gameName, setGameName] = useState('');
    const [minPlayer, setMinPlayer] = useState('');
    const [maxPlayer, setMaxPlayer] = useState('');
    const gmInitialState = {
        name:'Standard',
        description: '',
        winConditionID: 1
    };
    const [gameModes, setGameModes] = useState([gmInitialState]);
    const [winConditionList, setWinConditionList] = useState();
    const [alertMessage, setAlertMessage] = useState('');
    const [gameModeAlertMessage, setGameModeAlertMessage] = useState('');

    
    useEffect(() => {
        var url = config.apiURL + 'api/WinCondition';
        fetch(url,{
            method:'GET',
            headers: {'Content-Type':'application/json'}
        })
        .then(response=>response.json())
        .then(item=>{setWinConditionList(item)})
    }, [])

    var submitHandler = (e) =>{
        e.preventDefault();
        
        if(gameName.length===0 ){
            setAlertMessage("Name cannot be empty — check it out!");
            setActiveStep(0);
           
        }else if(minPlayer.length===0){
            setAlertMessage ("Minimum Number of Player cannot be empty — check it out!");
            setActiveStep(0);
        }else if(maxPlayer.length===0){
            setAlertMessage( "Maximum Number of Player cannot be empty — check it out!");
            setActiveStep(0);

        }else{
            setAlertMessage('');
            var validation = true;
            for (var i =0;i<gameModes.length;i++){
                var gm = gameModes[i];
                if(gm.name.length===0){
                    validation = false;
                    setGameModeAlertMessage("GameMode Name cannot be empty — check it out!");
                    setActiveStep(1);
                    
                }else if(gm.description.length===0){
                    validation = false;
                    setGameModeAlertMessage("GameMode Description cannot be empty — check it out!");
                    setActiveStep(1);
                }
            }
            if(validation){
                post(gameName, minPlayer, maxPlayer, gameModes);
                setGameName('');
                setMinPlayer('');
                setMaxPlayer('');
                setGameModes([gmInitialState])
                alert(gameName + " has been added successfully!");
                setAlertMessage('');
                setGameModeAlertMessage("");
                setActiveStep(0);
            }
        }
    };
   
    function post(gameName, minPlayer, maxPlayer) {
        var url = config.apiURL + 'api/game/';
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Name: gameName,
                MinPlayerCount: minPlayer,
                MaxPlayerCount: maxPlayer,
                GameModeItems: gameModes
             })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }
    
    function addGameModeRow (props){
        var array = gameModes.slice(0);//need to deep copy
        array.push(gmInitialState);
         setGameModes(array);
    }
    function deleteGameModeRow(index){
        if(index !==0){
            var newGameModes = [...gameModes];
            _.remove(newGameModes, gm => gameModes.indexOf(gm) === index);
            setGameModes(newGameModes);
        }
    }

    function onGameChange(index, gameMode) {
        var newValue = gameModes.slice(0); //need to deep copy
        newValue[index] = gameMode;
        setGameModes(newValue);
     }

    function getStepContent(step) {
        switch (step) {
          case 0:
            return (
                <div>
                    <h3>Create game ...</h3>
                    {alertMessage.length==0?(''):( <Alert severity="error">{alertMessage}</Alert>)}
               
                    <br></br>
                            <div>
                                <label>Name: </label>
                                <TextField type = "text" name="gameName" value={gameName} onChange={e => setGameName(e.target.value)} required variant="outlined" label="Required"></TextField>   
                            </div>
                            <br></br>
                            <div>
                                <label>Minimum Number of Players: </label>
                                <TextField type = "number" name="minPlayer" value={minPlayer} onChange={e => setMinPlayer(e.target.value)} required variant="outlined" label="Required"></TextField>
                            </div>
                            <br></br>
                            <div>
                                <label>Maximum Number of Players: </label>
                                <TextField type = "number" name="maxPlayer" value={maxPlayer} onChange={e => setMaxPlayer(e.target.value)}required variant="outlined" label="Required"></TextField>
                            </div>
                            <br></br>
                            
                </div>
            );
          case 1:
            return (
                <div>
                    <h3>Add (at least one) Game Mode(s)</h3>
                    {gameModeAlertMessage.length==0?(''):( <Alert severity="error">{gameModeAlertMessage}</Alert>)}
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>No.</TableCell>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Game Mode Name</TableCell>    
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Game Mode Desciption</TableCell>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Win Condition</TableCell>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Delete</TableCell>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Add Row</TableCell>                                                                           
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gameModes.map((gm,index)=>
                                        <GameModeRow 
                                            key={index}
                                            index={index}

                                            gameMode={gm} 
                                            onChange={onGameChange} 

                                            onDeleteGameModeRow={deleteGameModeRow}
                                            indexForDelete={index}
                                            onAddGameModeRow={addGameModeRow}
                                            winConditionList={winConditionList}
                                            classes={classes}/>
                                    )}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            );
          case 2:
              function findWinConditionIndex(id){
                return _.findIndex(winConditionList, function(w){return w.id === id});
              }
            return (
                <div>
                    <h3>Review and Submit</h3>
                    <p>Game Name: {gameName}</p>
                    <p>Minimum Number of Player: {minPlayer}</p>
                    <p>Maximum Number of Player: {minPlayer}</p>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>No.</TableCell>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Game Mode Name</TableCell>    
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Game Mode Desciption</TableCell>
                                        <TableCell style={{fontWeight: "bold", textAlign: "center"}}>Win Condition</TableCell>                                                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gameModes.map((gm, index)=>
                                        <TableRow key={index}>
                                            <TableCell style={{textAlign: "center"}}>{index+1}</TableCell>
                                            <TableCell style={{textAlign: "center"}}>{gm.name}</TableCell>
                                            <TableCell style={{textAlign: "center"}}>{gm.description}</TableCell>
                                            <TableCell>
                                                {winConditionList[findWinConditionIndex(gm.winConditionID)].id}) 
                                                {winConditionList[findWinConditionIndex(gm.winConditionID)].name} : 
                                                {winConditionList[findWinConditionIndex(gm.winConditionID)].description}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            );
          default:
            return 'Unknown step';
        }
      }

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
       setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>
            <h1>Create Games</h1>
                <hr></hr>
                <br></br>

                <div className="CreateGames">
                <div className={classes.root}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            </Step>
                            );
                        })}
                    </Stepper>

                    <div>
                        <div>
                            <form>
                            {getStepContent(activeStep)}
                            </form>
                            <br/>
                            <div>
                            <Button 
                                variant="contained"
                                disabled={activeStep === 0} 
                                onClick={handleBack} 
                                className={classes.button}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                            
                            <Button 
                                type = 'submit' 
                                variant="contained" 
                                color="primary" 
                                onClick={submitHandler}
                            >Review and Submit</Button>

                            ) : (
                            <Button 
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                            >Next</Button>)}
                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    );
}
export default CreateGames;