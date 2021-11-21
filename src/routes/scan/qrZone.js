import React from 'react';

import Scan from './Scan';
import Generate from './Generate';

export default function QrZone() {
    let token = JSON.parse(localStorage['token']);
    let rol = token.user_rol;
    return (
        <div>
            {rol === 'student' ? <Scan /> : <Generate />}
        </div>
    );

}