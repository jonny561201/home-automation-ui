import React, { useState } from 'react';
import { Divider } from '@mui/material';
import AddGarage from './AddGarage';
import AddLight from './AddLight';
import AddThermostat from './AddThermostat';
import AddSumpPump from './AddSumpPump';
import AddSecurity from './AddSecurity';
import { GreenButton } from '../../../components/controls/Buttons';
import './DeviceRegistration.css';


export default function DeviceRegistration({ device }) {
    const [registering, setRegistering] = useState(false);

    const onComplete = () => setRegistering(false);

    const getTypeLabel = () => {
        switch (device.type) {
            case 'garage_door': return 'Garage Door';
            case 'lighting': return 'Lighting';
            case 'thermostat': return 'Thermostat';
            case 'sump_pump': return 'Sump Pump';
            case 'security': return 'Security';
            default: return device.type;
        }
    };

    return (
        <div className="registration-content">
            {registering
                ? <>
                    {device.type === 'garage_door' && <AddGarage device={device} onComplete={onComplete} />}
                    {device.type === 'lighting' && <AddLight device={device} onComplete={onComplete} />}
                    {device.type === 'thermostat' && <AddThermostat device={device} onComplete={onComplete} />}
                    {device.type === 'sump_pump' && <AddSumpPump device={device} onComplete={onComplete} />}
                    {device.type === 'security' && <AddSecurity device={device} onComplete={onComplete} />}
                </>
                : <>
                    <h2 className="status-text-bold text">Register New Device!</h2>
                    <Divider />
                    <div className="registration-subtext">
                        <p className="status-text text">A new {getTypeLabel()} device has been detected and needs to be registered.</p>
                    </div>
                    <GreenButton onClick={() => setRegistering(true)}>Register</GreenButton>
                </>
            }
        </div>
    );
}
