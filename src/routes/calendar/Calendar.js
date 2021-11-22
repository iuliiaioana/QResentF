import * as React from 'react';
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FixedSizeList as List } from 'react-window';

import './Calendar.scss';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";


async function getSubjects(params) {
    return await fetch(`http://127.0.0.1:5000/calendar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)

    }).then(data => {
        if (!data.ok) {
            return;
        }
        console.log(JSON.stringify(data));
        return data.json();
    });
}

async function getSubjectItem(params) {
    const subjects = await getSubjects(params);
    const subjectsStrings = [];

    const keys = Object.keys(subjects);
    for (let key of keys) {
        subjectsStrings.push(`${key} | ${subjects[key][0]}`);
    }

    return subjectsStrings;
}

function isSubjectNow(hourInterval) {
    const start = parseInt(hourInterval.split(":")[0]);
    const end = parseInt(hourInterval.split(":")[1]);
    const now = new Date().getHours();

    return start <= now && now <= end;
}

export default function Calendar() {

    let history = useHistory();
    if (localStorage.getItem("status") !== "loggedIn") {
        history.push("/login");
    }
    let token = JSON.parse(localStorage.getItem('token'));
    let id_user = token['user_id'];

    const [subjects, setSubjects] = useState([]);

    const dayOfWeek = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
    const date = new Date();

    function renderRow({ index, style }) {
        return (
            <ListItem  className={isSubjectNow(subjects[index].split(" ")[0]) ? 'SubjectNow' : 'MyList'} style={style} key={index} component="div" disablePadding>
                <ListItemButton style={{textAlign: "center"}}>
                    <ListItemText primary={`${subjects[index]}`} />
                </ListItemButton>
            </ListItem>
        );
    }

    useEffect(async () => {
        const subjects = await getSubjectItem({
            id: id_user,
            zi: dayOfWeek[date.getDay() - 1].toLowerCase()
        })
        setSubjects(subjects);
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div>
                <br/>
                <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {dayOfWeek[date.getDay() - 1]}
                </h1>
                <br/>
                <List
                    showsVerticalScrollIndicator={false}
                    height={subjects.length*55}
                    className="no-scrollbars"
                    itemCount={subjects.length}
                    itemSize={55}
                    width={400}
                >
                    {renderRow}
                </List>
            </div>
        </div>
    );
}