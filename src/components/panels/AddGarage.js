import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { addUserDeviceNode } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';
import { CheckCircle } from '@material-ui/icons';
import './AddGarage.css';

export default function AddGarage(props) {
    const [succeeded, setSucceeded] = useState();
    const [garageName, setGarageName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [garageTouched, setGarageTouched] = useState(false);
    const [availableNodes, setAvailableNodes] = useState(1);

    const checkGarageName = (input) => {
        if (availableNodes > 0) {
            const name = input.target.value;
            setGarageTouched(true);
            setIsNameValid(name !== "");
            setGarageName(name);
        } else {
            props.close();
        }
    }

    const submitGarageDoor = async (event) => {
        event.preventDefault();
        (garageTouched && isNameValid)
            ? updateGarageNode()
            : setIsNameValid(false);
    }

    const updateGarageNode = async () => {
        const response = await addUserDeviceNode(getStore().getUserId(), props.deviceId, garageName);
        setSucceeded(response.ok);
        const jsonResponse = await response.json();
        setAvailableNodes(jsonResponse.availableNodes);
        console.log('RESPONSE:', succeeded)
        if (jsonResponse.availableNodes === 0 ) {props.close();}
    }

    const resetDevices = () => {
        setSucceeded(false);
        setGarageName('');
        setGarageTouched(false);
    }

    return (
        <div>
            {succeeded
                ? <div>
                    <div className="device-group">
                        <div className="device-group">
                            <CheckCircle className="success-text" />
                            <h2 data-testid={"data-add-device"} className="device-text success-text">Successfully Added</h2>
                        </div>
                        <CloseIcon data-testid={"garage-close-button"} onClick={() => props.close()} className="close-icon" />
                    </div>
                    <div className="device-row">
                        <p className="device-text">Would you like to setup the remaining ({availableNodes}) openers?</p>
                    </div>
                    <button onClick={resetDevices}>Add</button>
                </div>
                : <div>
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
            }
        </div>
    );
}