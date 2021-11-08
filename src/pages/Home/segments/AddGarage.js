import React, { useState, useContext } from 'react';
import { TextField, FormControlLabel } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { addUserDeviceNode, getRolesByUserId } from '../../../utilities/RestApi';
import { CheckCircle } from '@material-ui/icons';
import { Context } from '../../../state/Store';
import { GreenCheckbox } from '../../../components/controls/CheckBox';
import './AddGarage.css';

export default function AddGarage(props) {
    const [state, dispatch] = useContext(Context);
    const [succeeded, setSucceeded] = useState();
    const [preferred, setPreferred] = useState(false);
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
        }
    }

    const submitGarageDoor = async (event) => {
        event.preventDefault();
        (garageTouched && isNameValid)
            ? updateGarageNode()
            : setIsNameValid(false);
    }

    const updateGarageNode = async () => {
        const response = await addUserDeviceNode(state.user.userId, state.auth.bearer, state.deviceId, garageName);
        updateRoles()
        setSucceeded(response.ok);
        const jsonResponse = await response.json();
        setAvailableNodes(jsonResponse.availableNodes);
        dispatch({ type: "SET_ADDED_GARAGE_NODE", payload: true })
        if (jsonResponse.availableNodes === 0) {
            props.close();
        }
    }

    const updateRoles = async () => {
        const userRoles = await getRolesByUserId(state.user.userId, state.auth.bearer);
        await dispatch({ type: 'SET_USER_DATA', payload: { ...state.user, roles: userRoles.roles } });
        const garageRole = userRoles.roles.find(x => x.role_name === 'garage_door');
        await dispatch({ type: 'SET_GARAGE_ROLE', payload: garageRole });
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
                            <h2 data-testid={"data-add-device"} className="device-text text success-text">Successfully Added</h2>
                        </div>
                        <CloseIcon data-testid={"garage-close-button"} onClick={() => props.close()} className="close-icon" />
                    </div>
                    <div className="device-row">
                        <p className="device-text text">Would you like to setup the remaining ({availableNodes}) openers?</p>
                    </div>
                    <button onClick={resetDevices} className="success-ripple">Add</button>
                </div>
                : <div>
                    <div className="device-group">
                        <h2 data-testid={"data-add-device"} className=" device-text text">Add Garage Door</h2>
                        <CloseIcon data-testid={"garage-close-button"} onClick={() => props.close()} className="close-icon" />
                    </div>
                    <form onSubmit={submitGarageDoor}>
                        <div className="account-row">
                            <TextField value={garageName} error={!isNameValid} onChange={checkGarageName} variant="outlined" label="Garage Name" />
                        </div>
                        <div className="account-row">
                            <FormControlLabel control={<GreenCheckbox checked={state.checkedG} onChange={() => setPreferred(!preferred)} name="checkedG" />} label="Preferred Garage Door" />
                        </div>
                        <button type="submit" className="success-ripple">Add</button>
                    </form>
                </div>
            }
        </div>
    );
}