import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from "react-router-dom";
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

    let history = useHistory();
    if (localStorage.getItem("status") !== "loggedIn") {
        history.push("/login");
    }
    let token = JSON.parse(localStorage['token']);
    let id_user = token.user_id;
    console.log(id_user);

    const [scan, setScan] = useState("no result");
    const [oldScans, setOldScans] = useState(["no result"]);
    const [oldScan, setOldScan] = useState("no result");
    const [scanError, setScanError] = useState(false);

    // qr response popupus
    const [open, setOpen] = React.useState(false);
    const handleClose = (value) => {
        setOpen(false);
    };

    const handleScan = async data => {
        if (data) {
            setScan(data);
            if (!oldScans.includes(data)) {
                console.log(oldScans);
                let aux = oldScans;
                aux.push(data)
                setOldScans(aux);
                setOldScan(data);
                const beans = data.split(',');
                const err = await sendQRCode({
                    activitate_id: beans[0],
                    ora_qr: beans[1],
                    user_id: id_user
                });
                setOpen(true);
                if (err === undefined) {
                    setScanError(true);
                } else {
                    setScanError(false);
                }
            } else {
                if (oldScan !== data) {
                    setOpen(true);
                    setScanError(true);
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