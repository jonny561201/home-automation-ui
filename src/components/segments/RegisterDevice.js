import React, { useState, useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { isValidIpAddress, debounchApi } from '../../utilities/Services';
import { addUserDevice } from '../../utilities/RestApi';
import CloseIcon from '@material-ui/icons/Close';
import AddGarage from './AddGarage';
import './RegisterDevice.css';
import { Context } from '../../state/Store';


export default function RegisterDevice(props) {
    const [wrapperRef, setWrapperRef] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [ipAddress, setIpAddress] = useState('');
    const [touched, setTouched] = useState(false);
    const [isIpValid, setIsIpValid] = useState(true);
    const [startedRegistration, setStartedRegistration] = useState(false);
    const [transitionComponent, setTransitionComponent] = useState(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        setStartedRegistration(state.startedGarageRegistration);
    });

    const checkIpAddress = (input) => {
        const ipAddress = input.target.value;
        debounchApi(() => setIsIpValid(isValidIpAddress(ipAddress)));
        setIpAddress(ipAddress);
        setTouched(true);
    }

    const handleClickOutside = (event) => {
        if (wrapperRef && !props.parentRef.contains(event.target) && !wrapperRef.contains(event.target)) {
            props.close();
        }
    }

    const submitDevice = async (event) => {
        event.preventDefault();
        if (isIpValid && touched) {
            const response = await addUserDevice(state.userId, 'garage_door', ipAddress)
            const responseObj = await response.json();
            dispatch({type: 'SET_STARTED_GARAGE_REGISTRATION', payload: true})
            dispatch({type: 'SET_DEVICE_ID', payload: responseObj.deviceId});
            setTransitionComponent(response.ok);
        }
    }

    return (
        <div className="device-menu" ref={(node) => {setWrapperRef(node)}}>
            {transitionComponent || startedRegistration
                ? <AddGarage close={props.close} />
                : <div>
                    <div className="device-group">
                        <h2 data-testid={"data-add-device"} className=" device-text text">Add Device</h2>
                        <CloseIcon data-testid={"close-button"} onClick={() => props.close()} className="close-icon" />
                    </div>
                    <form onSubmit={submitDevice}>
                        <div className="account-row">
                            <TextField value={ipAddress} error={!isIpValid} onChange={checkIpAddress} variant="outlined" label="IP Address" />
                        </div>
                        <button type="submit" className="success-ripple">Next</button>
                    </form>
                </div>
            }
            </div>
    );
}