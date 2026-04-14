import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function AddSumpPump({ device, onComplete }) {
    return (
        <div>
            <div className="device-group">
                <h2 className="device-text text">Add Sump Pump</h2>
                <IconButton aria-label="Close" onClick={onComplete}>
                    <CloseIcon />
                </IconButton>
            </div>
            <p className="device-text text">Sump pump configuration for {device.name} coming soon.</p>
        </div>
    );
}
