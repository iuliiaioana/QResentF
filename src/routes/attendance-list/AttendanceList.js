import * as React from 'react';
import {useState} from 'react';

import './AttendanceList.scss';

import Select from 'react-select'
import { Button } from "@mui/material";
import token from "../../useToken";
import AsyncSelect from "react-select/async";

let activities;
let dates;
let mappedDates;

async function getActivities(profesor_id) {
    activities = await fetch(`http://127.0.0.1:5000/activitati_profesor/${profesor_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => {
        if (!data.ok) {
            return;
        }
        return data.json();
    });
}

async function getActivityKeys(profesor_id) {
    if (!activities) {
        await getActivities(profesor_id);
    }
    const keys = Object.keys(activities)
    return keys.map(x => {return {value: x, label: x}})
}

async function getDates(activity_id) {
    dates = await fetch(`http://127.0.0.1:5000/dati/${activity_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => {
        if (!data.ok) {
            return;
        }
        return data.json();
    });
}


async function getDatesAsync(activityId) {
    await getDates(activityId)
    mappedDates = dates.map(x => {return {value: x, label: x}})
}


async function getAttendanceList(activityId, date) {
    return fetch(`http://127.0.0.1:5000/prezenta/${activityId}/${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => {
            if (!data.ok) {
                return;
            }
            return data.json();
        });
}

const downloadTxtFile = async (activityId, date) => {
    console.log("download...")
    console.log(activityId, date)
    const res = await getAttendanceList(activityId, date);

    console.log(res);
    const file = new Blob([JSON.stringify(res, null, 2)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `prezenta${date}.xls`;

    element.click();
}

const activityOptions = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(getActivityKeys(JSON.parse(localStorage.getItem("token"))['user_id']));
        }, 1000);
    });


export default function AttendanceList() {

    const [activity, setActivity] = useState(null);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="container">
            <AsyncSelect cacheOptions
                         loadOptions={activityOptions}
                         defaultOptions
                         onChange={async (changedValue) => {
                             setSelectedDate(null)
                             setActivity(changedValue)
                             await getDatesAsync(activities[changedValue.value])
                             setDates(mappedDates)
                         }}>
            </AsyncSelect>
            <br/>
            <Select value={selectedDate} options={dates} onChange={changedValue => setSelectedDate(changedValue)} />
            <br/>

            <Button  style={{
                backgroundColor: "#1A76D2",
                color: '#FFFFFF',
                width: "100%"
            }}
                    onClick={() => downloadTxtFile(activities[activity.value], selectedDate.value)}>
                Download
            </Button>
        </div>
    );
}