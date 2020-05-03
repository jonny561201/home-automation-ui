import React, { useState } from 'react';
import { Divider, TextField } from '@material-ui/core';
import { isValidIpAddress, debounchApi } from '../../utilities/Services';
import { addUserDevice } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';
import './RegisterDevice.css';

export default function RegisterDevice() {
    const [isIpValid, setIsIpValid] = useState(true);
    const [ipAddress, setIpAddress] = useState();
    const [touched, setTouched] = useState(false);

    const checkIpAddress = (input) => {
        const ipAddress = input.target.value;
        debounchApi(() => setIsIpValid(isValidIpAddress(ipAddress)));
        setIpAddress(ipAddress);
        setTouched(true);
    }

    const submitDevice = (event) => {
        event.preventDefault();
        if(isIpValid && touched){
            addUserDevice(getStore().getUserId(), 'garage_door', ipAddress)
        }
    }

    return (
        <div className="device-menu device-text">
            <h2 data-testid={"data-add-device"}>Add Device</h2>
            <form  onSubmit={submitDevice }>
                <div className="account-row">
                    <TextField value={ipAddress} error={!isIpValid} onChange={checkIpAddress} variant="outlined" label="IP Address" />
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    );
}