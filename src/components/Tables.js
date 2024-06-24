import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { keyboard } from '@testing-library/user-event/dist/keyboard';



const Tables = () => {

    const [appointments, setAppointments] = useState(null)
    const [patients, setPatients] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3004/appointments")
            .then(resAppointment => {
                setAppointments(resAppointment.data)
                axios.get("http://localhost:3004/patients")
                    .then(resPatient => {
                        setPatients(resPatient.data)
                    })
                    .catch((err) => console.log("patient error", err))
            })
            .catch(err => console.log("appointment error", err))
    }, [])

    if (appointments == null || patients == null) {
        return (
            <h1>Loading....</h1>
        )
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#aaa" }}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Surname</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Procedures</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            appointments.map((appointment) => {
                                const findPatient = patients.find((patient) => patient.id === appointment.patientId)

                                return (

                                    <TableRow
                                        key={appointment.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {appointment.date}
                                        </TableCell>
                                        <TableCell align="right">{findPatient.name}</TableCell>
                                        <TableCell align="right">{findPatient.surname}</TableCell>
                                        <TableCell align="right">{findPatient.phone}</TableCell>
                                        <TableCell align="right">Buttons</TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}



export default Tables
