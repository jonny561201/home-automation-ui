import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { isValidIpAddress, debounchApi } from '../../utilities/Services';
import { addUserDevice, addUserDeviceNode } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';
import CloseIcon from '@material-ui/icons/Close';
import './RegisterDevice.css';

export default function RegisterDevice(props) {
    const [userId, ] = useState(getStore().getUserId());
    const [ipAddress, setIpAddress] = useState('');
    const [garageName, setGarageName] = useState('');
    const [touched, setTouched] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isIpValid, setIsIpValid] = useState(true);
    const [garageTouched, setGarageTouched] = useState(false);
    const [transitionComponent, setTransitionComponent] = useState(null);

    const checkIpAddress = (input) => {
        const ipAddress = input.target.value;
        debounchApi(() => setIsIpValid(isValidIpAddress(ipAddress)));
        setIpAddress(ipAddress);
        setTouched(true);
    }

    const submitDevice = async (event) => {
        event.preventDefault();
        if (isIpValid && touched) {
            const response = await addUserDevice(userId, 'garage_door', ipAddress)
            setTransitionComponent(response.ok)
        }
    }

    const checkGarageName = (input) => {
        const name = input.target.value;
        if(name !== ""){
            setGarageTouched(true);
        } else {
            setGarageTouched(false);
        }
        setGarageName(name);
    }

    const submitGarageDoor = async (event) => {
        event.preventDefault();
        if(garageTouched && isNameValid) {
            addUserDeviceNode(userId, "deviceId", garageName)
        } else {
            setIsNameValid(false);
        }
    }

    return (
        <div className="device-menu">
            {transitionComponent
                ? <div>
                    <div className="device-group">
                        <h2 data-testid={"data-add-device"} className=" device-text">Add Garage Door</h2>
                        <CloseIcon onClick={() => props.close()} className="close-icon" />
                    </div>
                    <form onSubmit={submitGarageDoor}>
                        <div className="account-row">
                            <TextField value={garageName} error={!isNameValid} onChange={checkGarageName} variant="outlined" label="Garage Name" />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
                : <div>
                    <div className="device-group">
                        <h2 data-testid={"data-add-device"} className=" device-text">Add Device</h2>
                        <CloseIcon data-testid={"close-button"} onClick={() => props.close()} className="close-icon" />
                    </div>
                    <form onSubmit={submitDevice}>
                        <div className="account-row">
                            <TextField value={ipAddress} error={!isIpValid} onChange={checkIpAddress} variant="outlined" label="IP Address" />
                        </div>
                        <button type="submit">Next</button>
                    </form>
                </div>
            }
            </div>
    );
}