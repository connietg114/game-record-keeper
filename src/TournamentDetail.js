import React, { useState, useEffect, useContext } from 'react';
import ConfigContext from './ConfigContext';
import './index.css';
import moment from 'moment';
import { useLocation } from "react-router-dom";

function TournamentDetail(props) {

    const config = useContext(ConfigContext);

    let location = useLocation();
    var url = location.pathname;
    var tournamentId = url.substr(url.lastIndexOf('/') + 1);
    const [tournament, setTournament] = useState([]);
    useEffect(() => {
        var url = config.apiURL + 'api/tournament/getTournamentDetails?id=' + tournamentId;
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
            .then(response => response.json())
            .then(item => {
                setTournament(item);
            });
    }, [config.apiURL, tournamentId]);

    return (
        <div>
            <h1>Tournament Details</h1>
            <hr></hr>

            <div>
                <p>Tournament ID:{tournament.id}</p>
                <p>Tournament Name: {tournament.name}</p>
                <p>Start Date: {moment(tournament.startDate).format("YYYY-MM-DD")}</p>
                <p>Start Time: {moment(tournament.startDate).format("h:mm:ss a")}</p>
                <p>End Date: {moment(tournament.endDate).format("YYYY-MM-DD")}</p>
                <p>End Time: {moment(tournament.endDate).format("h:mm:ss a")}</p>
                <p>Tournament Type ID: {tournament.tournamentType && tournament.tournamentType.id}</p>
                <p>Tournament Type Name: {tournament.tournamentType && tournament.tournamentType.name}</p>
                <p>Tournament Type Description: {tournament.tournamentType && tournament.tournamentType.description}</p>
            </div>

        </div>
    );
}
export default TournamentDetail;
