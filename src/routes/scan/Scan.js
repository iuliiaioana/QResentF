import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import './Scan.scss';

async function sendQRCode(payload) {        // id_activit, ora generare qr, 
    return fetch('http://127.0.0.1:5000/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(data => {
            if (!data.ok) {
                return;
            }
            return data.json();
        });
}

function SimpleDialog(props) {
    const { onClose, selectedValue, open, info} = props;
    const handleClose = () => {
        onClose(selectedValue);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{info}</DialogTitle>
        </Dialog>
        
    );
}

export default function Scan() {

    const [scan, setScan] = useState("no result");
    const [oldScan, setOldScan] = useState("no result");
    const [scanError, setScanError] = useState(false);

    // invalid qr popup
    const [open, setOpen] = React.useState(false);
    const handleClose = (value) => {
        setOpen(false);
    };

    const handleScan = async data => {
        if (data) {
            setScan(data);
            if (data !== oldScan) {
                console.log("data: " + data + " old " + oldScan);
                setOldScan(data);
                const beans = data.split(',');
                const err = await sendQRCode({
                    activitate_id: beans[0],
                    ora_qr: beans[1],
                    user_id: "1mock1" // localStorage.getItem('id_user');
                });
                if (err === undefined) {
                    setScanError(true);
                    setOpen(true);
                } else {
                    if (scanError === true) {
                        setOpen(true);
                    }
                    setScanError(false)
                }
            }
        }
    }


    return (
        <div>
            <QrReader className="qr-code" onScan={handleScan} />
            {scanError === true ?
                <SimpleDialog  open={open} onClose={handleClose} info="Invalid QR"/> : 
                <SimpleDialog  open={open} onClose={handleClose} info="QR sent"/>
            }
        </div>
    );
}