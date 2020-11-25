import React, {useState, useContext} from 'react';
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
    },
  }));
  
function getSteps() {
return ['Create game ', 'Add Game Mode(s)', 'Review and Submit'];
}

function GameModeRow(props){

    return (
        <TableRow>
            <TableCell style={{padding: "5px", textAlign: "center"}}>{props.number}</TableCell>
            <TableCell style={{padding: "5px"}}><TextField variant="outlined" style={{width: "100%", boxSizing: "border-box"}}></TextField></TableCell>    
            <TableCell style={{padding: "5px"}}><TextField variant="outlined" style={{width: "100%", boxSizing: "border-box"}}></TextField></TableCell>  
            <TableCell style={{padding: "5px", textAlign: "center"}}>
                <FormControl variant="outlined" style={{width: "100%", boxSizing: "border-box"}} className={props.classes.formControl}>
                    {/* <InputLabel id="demo-simple-select-outlined-label">Win Condition</InputLabel> */}
                    <Select
                        
                        value={props.gameModes.winCondition} 
                        onChange={e => props.onChange(props.index, { ...props.gameModes, winCondition: e.target.value })}
                        
                    >
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
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

    var submitHandler = e =>{
        e.preventDefault();
        post(gameName, minPlayer, maxPlayer);
        setGameName('');
        setMinPlayer('');
        setMaxPlayer('');
       alert(gameName + " has been added successfully!");
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
                MaxPlayerCount: maxPlayer })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
            // .then(data => setPostId(data.id));
    }

    // const [gmName, setGmName]=useState();
    // const [gmDesc, setGmDesc]=useState();
    // const [gmWinCondition, setGmWinCondition] =useState();
    const [gameModes, setGameModes] = useState([
        {
            name:"Standard",
            description: undefined || '',
            winCondition:undefined || ''
        }
    ]);
    function addGameModeRow (props){
        var array = [];
        for(var i = 0; i < gameModes.length; i++) {
            array.push(gameModes[i]);
        }
        array.push({
            name: '',
            description: undefined || '',
            winCondition: undefined || ''
        });
         setGameModes(array);

        // var array = gameModes;
        
        // array.push({
        //     name: '',
        //     description: undefined || '',
        //     winCondition: undefined || ''
        // });
        // console.log(array);
        // setGameModes(array);
    }
    function deleteGameModeRow(index){
        if(index !==0){
            var newGameModes = [...gameModes];
            _.remove(newGameModes, gm => gameModes.indexOf(gm) === index);
            setGameModes(newGameModes);
        }
    }

    function onGameChange(index, gameMode) {
        var newValue = gameModes;
        newValue[index] = gameMode
        setGameModes(newValue);
     }

    function getStepContent(step) {
        switch (step) {
          case 0:
            return (
                <div>
                    <h3>Create game ...</h3>
                        <form onSubmit={submitHandler}>
                            <div>
                                <label>Name: </label>
                                <input type = "text" name="gameName" value={gameName} onChange={e => setGameName(e.target.value)} required></input>
                                
                            </div>
                            <div>
                                <label>Minimum Number of Players: </label>
                                <input type = "number" name="minPlayer" value={minPlayer} onChange={e => setMinPlayer(e.target.value)} required></input>
                            </div>
                            <div>
                                <label>Maximum Number of Players: </label>
                                <input type = "number" name="maxPlayer" value={maxPlayer} onChange={e => setMaxPlayer(e.target.value)}required></input>
                            </div>
                            <br></br>
                            <button type='submit' >Submit</button>
                        </form>    
                </div>
            );
          case 1:
            return (
                <div>
                    <h3>Add (at least one) Game Mode(s)</h3>
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
                                            number={index+1}
                                            index={index}

                                            gameModes={gameModes} 
                                            onChange={onGameChange} 

                                            onDeleteGameModeRow={deleteGameModeRow}
                                            indexForDelete={index}
                                            onAddGameModeRow={addGameModeRow}
                                            classes={classes}/>
                                    )}
     
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            );
          case 2:
            return (
                <div>
                    <h3>Review and Submit</h3>

                </div>
            );
          default:
            return 'Unknown step';
        }
      }
    

    //stepper
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
       setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    //stepper
    return (
        <div>
            <h1>Create Games</h1>
                <hr></hr>
                <br></br>

                <div className="CreateGames">
                {/* stepper */}
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
                        {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} className={classes.button}>
                            Add More Game
                            </Button>
                        </div>
                        ) : (
                        <div>
                            {getStepContent(activeStep)}
                            <br/>
                            <div>
                            <Button 
                                disabled={activeStep === 0} 
                                onClick={handleBack} 
                                className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
        
                {/* stepper */}
            
            <br></br>
            </div>      
        </div>
    );
}
export default CreateGames;