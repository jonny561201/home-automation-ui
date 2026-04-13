import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function AddThermostat({ device, onComplete }) {
    return (
        <div>
            <div className="device-group">
                <h2 className="device-text text">Add Thermostat</h2>
                <IconButton aria-label="Close" onClick={onComplete} className="close-icon">
                    <CloseIcon />
                </IconButton>
            </div>
            <p className="device-text text">Thermostat configuration for {device.name} coming soon.</p>
        </div>
    );
}
