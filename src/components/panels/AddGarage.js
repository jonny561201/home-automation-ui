import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { addUserDeviceNode } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';

export default function AddGarage(props) {
    const [garageName, setGarageName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [garageTouched, setGarageTouched] = useState(false);

    const checkGarageName = (input) => {
        const name = input.target.value;
        setGarageTouched(true);
        setIsNameValid(name !== "");
        setGarageName(name);
    }

    const submitGarageDoor = async (event) => {
        event.preventDefault();
        (garageTouched && isNameValid)
            ? addUserDeviceNode(getStore().getUserId(), props.deviceId, garageName)
            : setIsNameValid(false);
    }

    return (
        <div>
            <div className="device-group">
                <h2 data-testid={"data-add-device"} className=" device-text">Add Garage Door</h2>
                <CloseIcon data-testid={"garage-close-button"} onClick={() => props.close()} className="close-icon" />
            </div>
            <form onSubmit={submitGarageDoor}>
                <div className="account-row">
                    <TextField value={garageName} error={!isNameValid} onChange={checkGarageName} variant="outlined" label="Garage Name" />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}