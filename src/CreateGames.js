import React, {useState, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));
  
  function getSteps() {
    return ['Create game ', 'Add Game Mode(s)', 'Review and Submit'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return 'Create game ...';
      case 1:
        return 'Add (at least one) Game Mode(s)';
      case 2:
        return 'Review and Submit';
      default:
        return 'Unknown step';
    }
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

    //stepper
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
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
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        {/* {isStepOptional(activeStep) && (
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSkip}
                            className={classes.button}
                            >
                            Skip
                            </Button>
                        )} */}

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
            <form onSubmit={submitHandler}>
                <div>
                    Name: 
                    <input type = "text" name="gameName" value={gameName} onChange={e => setGameName(e.target.value)} required></input>
                    
                </div>
                <div>
                    Min. Number of Players: 
                    <input type = "text" name="minPlayer" pattern="[0-9]*" value={minPlayer} onChange={e => setMinPlayer(e.target.value)} required>
                        {/* alert"Please enter a number" */}
                    </input>
                </div>
                <div>
                    Max. Number of Players: 
                    <input type = "text" name="maxPlayer" pattern="[0-9]*" value={maxPlayer} onChange={e => setMaxPlayer(e.target.value)}required></input>
                </div>
                <br></br>
                <button type='submit' >Submit</button>
            </form>
            <br></br>
            
            
            
        </div>
    );
}
export default CreateGames;