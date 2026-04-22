import React from 'react';
import { SensorsOff } from '@mui/icons-material';
import './Disconnected.scss';


export default function Disconnected({ message }) {
    return (
        <div className="disconnected">
            <SensorsOff className="disconnected-icon" />
            <p className="disconnected-text text">{message}</p>
        </div>
    );
}
