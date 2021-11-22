import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import './UserEntry.scss';

export default function UserEntry({ userData, refresh }) {

    const deleteUser = (id) => {
        fetch('http://127.0.0.1:5000/user/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => {
            refresh();
        })
    }

    return (
        <div className="user-container">
            <div className="user-item">
                <h3>{userData.nume} {userData.prenume}</h3>
                <h5>{userData.grupa}</h5>
            </div>
            <div className="user-item">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="scan"
                    onClick={() => deleteUser(userData.id)}
                    className="delete-button">
                    <DeleteIcon />
                </IconButton>
            </div>

        </div>
    );
}
