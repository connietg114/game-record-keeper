import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './CreateGameMatch.css';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  }));
  
  function getSteps() {
    return ['Create Game Match', 'Create Tournament', 'Review and Submit'];
  }
  
  
function CreateGameMatch(props){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const config = useContext(ConfigContext);

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        { title: 'The Lord of the Rings: The Return of the King', year: 2003 },]
    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
      };
      const flatProps = {
        options: top100Films.map((option) => option.title),
      };
      const [value, setValue] = React.useState(null);
     

    function getStepContent(stepIndex, classes) {
        switch (stepIndex) {
          case 0:
            return (
            <div>
                <h4>Create Game Match</h4>
                <div>
                    <label style={{display:"inline-block", marginTop:"5px"}}>Date & Time: </label>
                    <TextField
                        style={{}}
                        id="datetime-local"
                        type="datetime-local"
                        // value={new Date()}
                        defaultValue={moment().format("YYYY-MM-DDThh:mm:ss")}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
                <div style={{display:"inline-flex"}}>
                    <label style={{marginTop:"30px"}}>Choose a Game:  &nbsp;</label>
                    {/* <div style={{ width: 300 }}> */}
                        <Autocomplete
                        style={{ width: 300, margin: "10px auto" }}
                            {...defaultProps}
                            id="auto-complete"
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} margin="normal" />}
                        />
                    {/* </div> */}
                </div>
    
            </div>
    
            );
          case 1:
            return (
                <div>
                    <h4>Create Tournament</h4>
                </div>
            );
          case 2:
            return (
                <div>
                    <h4>Review and Submit</h4>
                </div>
            );
          default:
            return 'Unknown stepIndex';
        }
      }
    return (
        <div>
            <h1>Create Game Match</h1>
            <hr></hr>

            <div className="CreateGameMatch">
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} 
                    // alternativeLabel
                    >
                        {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel completed ={false} onClick={e=>setActiveStep(index)}>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length-1 ? (
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                                >
                                Back
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary">
                                Review and Submit
                            </Button>
                        </div>
                        ) : (
                        <div>
                            {getStepContent(activeStep, classes)}
                            <br></br><br></br>
                            <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Review and Submit' : 'Next'}
                            </Button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateGameMatch;