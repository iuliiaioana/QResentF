import React, {useState} from 'react';
import QrReader from 'react-qr-reader';
import './Scan.scss';

export default function Scan() {

  const [scan, setScan] = useState("no result");
 
  const handleScan = data => {
    if (data) {
      setScan(data);
    }
  }

  return (
    <div>
        <h2>TODO: Dragos</h2>

        <QrReader className="qr-code" onScan={handleScan} />
        <p>{scan}</p>
        
    </div>
  );
}