import React, { useState, useEffect, useContext, useMemo } from 'react';
import ConfigContext from './ConfigContext';
import { useTable } from 'react-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Players(){

    let config = useContext(ConfigContext);

    const [players, setPlayers] = useState([]);

    useEffect(() => {

        let cancel = false;

        (async () => {
            fetch(`${config.apiURL}api/players`, {})
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error(response.statusText);
                })
                .then(data => {
                    if (!cancel)
                        setPlayers(data);
                })
                .catch(error => {
                    console.log(error);
                });
        })()
        return () => cancel = true;
    }, [config.apiURL]);

    const data = useMemo(() => players, [players]);
    const columns = useMemo(() => [
        {
            Header: 'Preferred Name',
            accessor: 'preferredName'
        },
        {
            Header: 'Gender',
            accessor: 'gender'
        },
        {
            Header: 'First Name',
            accessor: 'firstName'
        },
        {
            Header: 'Last Name',
            accessor: 'lastName'
        }
    ], []);

    const playersTable = useTable({ columns, data});
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = playersTable;

    return(
        <div>
            <h1>Players</h1>
            <hr></hr>
            <TableContainer component={Paper}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {
                            headerGroups.map(headerGroup => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map(column => (
                                            <TableCell {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {
                            rows.map(row => {
                                prepareRow(row)
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return (
                                                    <TableCell {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default Players;