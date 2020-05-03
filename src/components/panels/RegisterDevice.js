import React, { useState } from 'react';
import { Divider, TextField } from '@material-ui/core';
import { isValidIpAddress, debounchApi } from '../../utilities/Services';
import { addUserDevice } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';

export default function RegisterDevice() {
    const [isIpValid, setIsIpValid] = useState(true);
    const [ipAddress, setIpAddress] = useState();


    const checkIpAddress = (input) => {
        const ipAddress = input.target.value;
        debounchApi(() => setIsIpValid(isValidIpAddress(ipAddress)));
        setIpAddress(ipAddress);
    }

    return (
        <div>
            <h2 data-testid={"data-add-device"}>Add Device</h2>
            <Divider />
            <form  onSubmit={() => addUserDevice(getStore().getUserId(), 'garage_door', ipAddress)}>
                <div className="account-row">
                    <TextField value={ipAddress} error={!isIpValid} onChange={checkIpAddress} variant="outlined" label="Add Device" />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}