import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './Scan.scss';

async function sendQRCode(payload) {  // id_activit, ora generare qr, 
    return fetch('http://127.0.0.1:5000/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(data => {
        if (!data.ok)  {
          return;
        }
        return data.json();
      }); 
   }
  

export default function Scan() {

    const [scan, setScan] = useState("no result");

    const [oldScan, setOldScan] = useState("no result");

    const handleScan = async data => {
        
        if (data) {
            setScan(data);
            if (data !== oldScan) {
                console.log("data: " + data + " old " + oldScan);
                setOldScan(data);
                const beans = data.split(',');
                const err = await sendQRCode({
                    activityId: beans[0],
                    dateTime: beans[1],
                    studentId: "1mock1"
                    // id_student: localStorage.getItem('id_user');
                });
            }
        }
        
    }

    
    

    return (
        <div>
            <h2 className="info">Nume Materie <br /> Nume Profesor </h2>
            <QrReader className="qr-code" onScan={handleScan}/>
            <p className="info">{scan}</p>
        </div>
    );
}