import React, {useState, useEffect, useContext} from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import _ from 'lodash';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';


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

function Tournaments (props){

    const config = useContext(ConfigContext);

    const [tournaments, setTournaments] = useState([]);
    const [selected, setSelected] = useState([]);
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        var url = config.apiURL + 'api/tournament/';
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
            .then(response => response.json())
            .then(item => {
                setTournaments(
                    item.map(i => {
                        return {
                            select: false,
                            id: i.id,
                            name: i.name,
                            startDate: i.startDate,
                            endDate: i.endDate,
                            tournamentType: i.tournamentType
                        }
                    })
                );

                setIsLoaded(true);
            });
    }, [config.apiURL]);


    let history = useHistory();
    const directToCreateTournaments = () => {
        history.push('/createtournaments/');
    }

    let his = useHistory();
    function navigateToDetailsPage(id) {
        his.push('/tournamentdetail/' + id);
    }

    function handleDeleteTask(tournamentID) {
        var newTournaments = [...tournaments];
        _.remove(newTournaments, tournament => tournament.id === tournamentID)
        setTournaments(newTournaments);
        deleteTournamet(tournamentID);
    }

    function deleteTournamet(tournamentID) {
        var url = config.apiURL + 'api/tournament/deletetournament?id=' + tournamentID;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "DELETE"
            }
        };
        fetch(url, requestOptions)
            .then(response => { return response.json(); })
            .then(data => { })
            .catch(error => {
                console.log(error);
            });
    }

    function handleBulkDelete() {
        let ids = [];
        for (var i = 0; i < selected.length; i++) {
            ids.push(selected[i].id);
        }
        setTournaments(tournaments.filter((tournament) => !selected.includes(tournament)));
        deleteMultipleTournaments(ids);
        setSelected([]);
        setSelectAll(false);
    }

    function deleteMultipleTournaments(tournamentList) {
        var url = config.apiURL + 'api/tournament/deleteMultiTournament';
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "DELETE"
            },
            body: JSON.stringify(tournamentList)
        };
        fetch(url, requestOptions)
            .then(response => { return response.json(); })
            .then(data => { })
            .catch(error => { console.log(error); });
    }

    if (!isLoaded)
        return null;

    return (
        <div>
            {selected.length > 0 ?
                (<Typography variant="h6" color="inherit">Delete {selected.length} tournaments selected
                    <IconButton>
                        <DeleteIcon onClick={handleBulkDelete} />
                    </IconButton>
                </Typography>
                ) : (
                    <h1>Tournaments</h1>)}

            <IconButton onClick={directToCreateTournaments}>
                <AddIcon /><Typography variant="body1">Add Tournaments</Typography>
            </IconButton>

            <hr></hr>
            <br></br>
            <Paper>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox checked={selectAll} onChange={e => {
                                        let checked = e.target.checked;
                                        setSelectAll(e.target.checked);
                                        setTournaments(tournaments.map(t => {
                                            t.select = checked;
                                            return t;
                                        }))
                                        if (e.target.checked) {
                                            let newSelected = tournaments.map(t => t);
                                            setSelected(newSelected);
                                        }
                                        else {
                                            setSelected([]);
                                        }
                                    }} />
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}> No. </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}> Tournament ID </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Start Date</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>End Date</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Tournament Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {tournaments.map((t, index) =>
                                <TableRow type="button" hover>
                                    <TableCell>
                                        <Checkbox checked={t.select} onChange={(e) => {
                                            setSelectAll(false);
                                            let checked = e.target.checked;
                                            var newSelected = [];
                                            setTournaments(
                                                tournaments.map(tournament => {
                                                    if (t.id === tournament.id) {
                                                        tournament.select = checked;
                                                        for (var i = 0; i < selected.length; i++) {
                                                            newSelected.push(selected[i]);
                                                        }
                                                        newSelected.push(t);
                                                        _.remove(newSelected, selectedTournament => selectedTournament.select === false);
                                                    }
                                                    return tournament;
                                                })
                                            );
                                            setSelected(newSelected);
                                        }} />
                                    </TableCell>
                                    <TableCell onClick={e => navigateToDetailsPage(t.id)}>{index + 1}</TableCell>
                                    <TableCell onClick={e => navigateToDetailsPage(t.id)}>{t.id}</TableCell>
                                    <TableCell onClick={e => navigateToDetailsPage(t.id)}>{t.name}</TableCell>
                                    <TableCell onClick={e => navigateToDetailsPage(t.id)}>{t.startDate}</TableCell>
                                    <TableCell onClick={e => navigateToDetailsPage(t.id)}>{t.endDate}</TableCell>
                                    <TableCell onClick={e => navigateToDetailsPage(t.id)}>{t.tournamentType && t.tournamentType.name}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <DeleteIcon onClick={e => { handleDeleteTask(t.id) }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell><IconButton><EditIcon /></IconButton></TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
export default Tournaments;
