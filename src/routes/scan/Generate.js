import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import QRCode from "react-qr-code";
import Button from '@mui/material/Button';

import './Generate.scss';
import { QrcodeOutlined } from '@ant-design/icons';

// GET id_activitate_curenta, parametru = id_profesor

Date.prototype.fixTimezone = function() {
    var copiedDate = new Date(this.getTime());
    copiedDate.setHours(copiedDate.getHours() + 2);
    return copiedDate;
}

async function getActivityId(payload) {
    return fetch('http://127.0.0.1:5000//generare_qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(data => {
        if (!data.ok)  {
            return "nup";
        }
        return data.json();
    }); 
}


export default function Generate() {

    let history = useHistory();
    if (localStorage.getItem("status") !== "loggedIn") {
        history.push("/login");
    }
    let token = JSON.parse(localStorage['token']);
    let id_user = token.user_id;
    console.log(id_user);

    const [activityId, setActivityId] = useState("");
    const [dateTime, setDateTime] = useState(new Date().fixTimezone().toISOString());
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date().fixTimezone().toISOString());
        }, 60000);
        return () => clearInterval(interval);
        }, []);
    

    let qrValue =  activityId + "," + dateTime;

    const handleGenerate = async data => {
        setIsOpened(true);
        setDateTime(new Date().fixTimezone().toISOString());
        const id = await getActivityId({
            profesor_id: id_user
        });
        console.log(id['activitate_id'])
        setActivityId(id['activitate_id']);
    }

    const handleHide = () => {
        setIsOpened(false);
    }

    return (
        <div>
            
            {isOpened && <div data-testid="qr">
                <p>{!qrValue.includes('undefined') && qrValue}</p>
                <QRCode className="qr-code" value={qrValue}  />
            </div>}

            <div className="flex-container">
                {isOpened && 
                <div className="flex-element">
                    <Button data-testid="hide" className="button" variant="outlined" onClick={handleHide}>Hide QR</Button>
                </div>} 
                {qrValue.includes('undefined') && <div className="flex-element">
                    <Button disabled data-testid="gen" className="button" variant="contained" onClick={handleGenerate}>Generate QR</Button>
                </div>}
                {!qrValue.includes('undefined') && <div className="flex-element">
                    <Button data-testid="gen" className="button" variant="contained" onClick={handleGenerate}>Generate QR</Button>
                </div>}
            </div>
        <div className="invisible" data-testid="var">{isOpened}</div>    
        </div>
    );  

}