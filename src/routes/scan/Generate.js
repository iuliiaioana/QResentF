import React, {useState, useEffect} from 'react';
import QRCode from "react-qr-code";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import './Generate.scss';

// GET id_activitate_curenta, parametru = id_profesor

export default function Generate() {

    const [dateTime, setDateTime] = useState(new Date().toISOString());
    const [isOpened, setIsOpened] = useState(true);

    // id_prof: localStorage.getItem('id_user');

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date().toISOString());
        }, 10000);
        return () => clearInterval(interval);
        }, []);
    

    let qrValue =  "ID," + dateTime;

    const handleGenerate = data => {
        setIsOpened(true);
        setDateTime(new Date().toISOString());
    }

    const handleHide = () => {
        setIsOpened(false);
    }

    return (
        <div>
            
            <div className={!isOpened ? "invisible" : ""}>
                <p>{qrValue}</p>
                <QRCode className="qr-code" value={qrValue}  />
            </div>

            <div className="flex-container"> 
                <div className="flex-element">
                    <Button className="button" variant="outlined" onClick={handleHide}>Hide QR</Button>
                </div>
                <div className="flex-element">
                    <Button className="button" variant="contained" onClick={handleGenerate}>Generate QR</Button>
                </div>
            </div>
           

        </div>
    );

}