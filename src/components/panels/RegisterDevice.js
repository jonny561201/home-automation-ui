import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { isValidIpAddress, debounchApi } from '../../utilities/Services';
import { addUserDevice } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';
import CloseIcon from '@material-ui/icons/Close';
import AddGarage from './AddGarage';
import './RegisterDevice.css';


export default function RegisterDevice(props) {
    const [ipAddress, setIpAddress] = useState('');
    const [startedRegistration, ] = useState(getStore().startedGarageRegistration());
    const [touched, setTouched] = useState(false);
    const [isIpValid, setIsIpValid] = useState(true);
    const [deviceId, setDeviceId] = useState(getStore().getGarageDeviceId());
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
            const responseObj = await response.json();
            setDeviceId(responseObj.deviceId);
            setTransitionComponent(response.ok);
        }
    }

    return (
        <div className="device-menu">
            {transitionComponent || startedRegistration
                ? <AddGarage close={props.close} deviceId={deviceId} />
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