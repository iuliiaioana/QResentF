import React, {useState} from 'react';
import QRCode from "react-qr-code";
import './Scan.scss';

export default function Generate() {


    return (
        <div>
        
            <QRCode className="qr-code" value="Materie Profesor Ora" />
            
        </div>
      );

}