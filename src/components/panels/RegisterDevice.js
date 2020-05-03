import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { isValidIpAddress, debounchApi } from '../../utilities/Services';
import { addUserDevice } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';
import CloseIcon from '@material-ui/icons/Close';
import './RegisterDevice.css';

export default function RegisterDevice(props) {
    const [ipAddress, setIpAddress] = useState();
    const [touched, setTouched] = useState(false);
    const [isIpValid, setIsIpValid] = useState(true);
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
            const response = await addUserDevice(getStore().getUserId(), 'garage_door', ipAddress)
            setTransitionComponent(response.ok)
        }
    }

    return (
        <div className="device-menu">
            {transitionComponent
                ? <div>
                  <div className="device-group">
                        <h2 data-testid={"data-add-device"} className=" device-text">Transitioned!!!</h2>
                        <CloseIcon onClick={() => props.close()} className="close-icon" />
                    </div>
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