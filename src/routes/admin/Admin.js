import React, { useState, useEffect } from 'react';

import './Admin.scss';
import UserEntry from './UserEntry';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

export default function Admin() {

    const getData = () => {
        let token = JSON.parse(localStorage['token']);
        fetch('http://127.0.0.1:5000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setUsers({
                    students: data.filter(user => user.rol == 'student'),
                    professors: data.filter(user => user.rol == 'profesor')
                });
                console.log(users);
            });
    }

    const addStudent = () => {

    }

    const addProfessor = () => {

    }

    let history = useHistory();
    const [users, setUsers] = useState({ students: [], professors: [] });

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="admin-container">
            <div className="studentList">
                <h2>Students</h2>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="scan"
                    onClick={() => addStudent()}
                    className="add-button"
                >
                    <AddIcon />
                </IconButton>
                {users.students.map((item, index) => {
                    return <UserEntry userData={item} refresh={getData} />
                })}
            </div>
            <div className="professorList">
                <h2>Professors</h2>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="scan"
                    onClick={() => addProfessor()}
                    className="add-button"
                >
                    <AddIcon />
                </IconButton>
                {users.professors.map((item, index) => {
                    return <UserEntry userData={item} refresh={getData}/>
                })}
            </div>
        </div>
    );
}

Admin.propTypes = {
    setToken: PropTypes.func.isRequired
};