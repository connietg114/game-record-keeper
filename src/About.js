import React from 'react';
import './About.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardDeck from 'react-bootstrap/CardDeck'

const useStyles = makeStyles({

    root: {
        minWidth: 275,
        maxWidth: 345,
        minHeight: 280,
        marginLeft: 15,
    },
    media: {
        height: 140,
    },
});

const cardStyle =
{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}


function About() {
    const classes = useStyles();

    return (
        <body>
        <div class="background">
            <div class= "title">
                <h1>About Us</h1>
            </div>

            <div class = "p">
                <p>
                        At GameRecordKeeper, we make your game record process easier! We are a team of three developers who would like to make a difference in your life! <br></br><br></br>

                    We created GameRecordKeeper to convenience board gamers. You can search for games you want to play and create tournaments! Our product keeps a clear result records for you. <br></br><br></br>

                    Our names are: 
                </p>
                </div>
                <div style={cardStyle}>
                    <Card className={classes.root} variant="outlined" >
                        <CardContent>
                            <CardMedia 
                                className={classes.media}
                                image={require("./image/blank-profile-picture.png")}
                                title="Kieran's profile" 
                            />
                            <Typography variant="h5" component="h2">
                                Kieran
                            </Typography>
                            <Typography variant="body2" component="p">
                                Stake Holder, Project Manager and Technical Consultant of this project.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.root} variant="outlined" >
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image={require("./image/blank-profile-picture.png")}
                                title="Connie's profile"
                            />
                            <Typography variant="h5" component="h2">
                                Connie
                            </Typography>
                            <Typography variant="body2" component="p">
                                Developer, graduate from University of Auckland, majored in Computer Science.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.root} variant="outlined" >
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image={require("./image/blank-profile-picture.png")}
                                title="Tracy's profile"
                            />
                        <Typography variant="h5" component="h2">
                            Tracy
                        </Typography>
                        <Typography variant="body2" component="p">
                            Developer, second year student from MIT, major in Software Development. 
                        </Typography>
                    </CardContent>
                    </Card>
                </div>
            </div>
        </body>

)
}
export default About;