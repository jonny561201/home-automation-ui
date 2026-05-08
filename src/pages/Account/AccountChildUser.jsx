import React, { useContext, useEffect, useState } from 'react';
import { addUserChildAccount, deleteUserChildAccount, getUserChildAccounts } from '../../utilities/RestApi';
import { Context } from '../../state/Store';
import { Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { AddButton, RemoveButton } from '../../components/controls/Buttons';
import './AccountChildUser.scss'


export default function AccountChildUser() {
    const [state, _] = useContext(Context);
    const devices = state.devices || [];
    const [selectedDevice, setSelectedDevice] = useState([]);
    const [email, setEmail] = useState("");
    const [childAccounts, setChildAccounts] = useState([]);
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);
    const [isDeviceInvalid, setIsDeviceInvalid] = useState(undefined);

    useEffect(() => {
        const getData = async () => {
            const response = await getUserChildAccounts();
            if (Array.isArray(response)) {
                setChildAccounts(response);
            }
        };
        getData();
    }, []);


    const submitChildAccount = async () => {
        if ((!isEmailInvalid && !isDeviceInvalid) && (selectedDevice.length !== 0 && email !== null && email !== "")) {
            const response = await addUserChildAccount(email, selectedDevice);
            setChildAccounts(response);
            setEmail("");
            setSelectedDevice([]);
        } else {
            setIsEmailInvalid(email === "" || email === null);
            setIsDeviceInvalid(selectedDevice.length === 0);
        }
    }

    const deleteChildUser = async (childUserId) => {
        const response = await deleteUserChildAccount(childUserId);
        if (response.ok)
            setChildAccounts(childAccounts.filter(x => x.user_id !== childUserId));
    }

    const validateEmail = (input) => {
        setEmail(input.target.value);
        setIsEmailInvalid(input.target.value === "");
    }

    const validateDevice = (input) => {
        setSelectedDevice(input.target.value);
        setIsDeviceInvalid(input.target.value === "");
    }

    const isFormValid = () => {
        return email.trim() !== "" && selectedDevice.length > 0;
    }

    return (
        <div className="child-user-container">
            <h2 className="panel-header-text">Managed Accounts</h2>
            <div>
                <p className="small-text text">Grant access to your devices</p>
                <Divider />
                {childAccounts.map(x => (
                    <div className="row align-items-center child-user-row" key={`user-${x.user_name}`}>
                        <div className="col-sm">{x.user_name}</div>
                        <div className="col-sm">{x.roles.join(', ')}</div>
                        <div className="col-sm-auto">
                            <RemoveButton aria-label={`user-${x.user_name}`} onClick={() => deleteChildUser(x.user_id)}></RemoveButton>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <p className="small-text text">Add a new user</p>
                <Divider />
                <div className="row align-items-center child-user-row">
                    <div className="col-sm user-input">
                        <TextField error={isEmailInvalid} onChange={(input) => validateEmail(input)} value={email} label="Email" fullWidth />
                    </div>
                    <div className="col-sm user-input">
                        <FormControl error={isDeviceInvalid} variant="outlined" fullWidth>
                            <InputLabel>Devices</InputLabel>
                            <Select labelId="multiple-name-label" variant="outlined" multiple value={selectedDevice} onChange={(input) => validateDevice(input)} input={<OutlinedInput label="Devices" />}
                                    renderValue={(selectedDevice) => (selectedDevice.join(', '))}>
                                {
                                    devices.map((device) => (
                                        <MenuItem key={device.name} value={device.name}>
                                            <Checkbox checked={selectedDevice.indexOf(device.name) > -1} />
                                            <ListItemText primary={device.name} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-sm-auto user-input">
                        <AddButton disabled={!isFormValid()} onClick={() => { submitChildAccount() }}></AddButton>
                    </div>
                </div>
            </div>
        </div>
    );
}