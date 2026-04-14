import React, { useState, useEffect } from 'react';
import { TextField, FormControlLabel, Divider, Button } from '@mui/material';
import { CheckCircle, Save, Delete } from '@mui/icons-material';
import { GreenCheckbox } from '../../../components/controls/CheckBox';
import { AddButton, RemoveButton } from '../../../components/controls/Buttons';
import { addUserDeviceNode } from '../../../utilities/RestApi';
import { useAuth0 } from '@auth0/auth0-react';
import './AddGarage.css';


export default function AddGarage({ device, onComplete }) {
    const auth0 = useAuth0();
    const [succeeded, setSucceeded] = useState(false);
    const [doors, setDoors] = useState([{ name: '', preferred: true, nameTouched: false, isNameValid: true }]);

    useEffect(() => {
        if (!succeeded) return;
        const timer = setTimeout(() => onComplete(), 5000);
        return () => clearTimeout(timer);
    }, [succeeded]);

    const handleNameChange = (index, event) => {
        const name = event.target.value;
        const updated = doors.map((door, i) =>
            i === index ? { ...door, name, nameTouched: true, isNameValid: name !== '' } : door
        );
        setDoors(updated);
    };

    const handlePreferredChange = (index) => {
        const updated = doors.map((door, i) =>
            i === index ? { ...door, preferred: true } : { ...door, preferred: false }
        );
        setDoors(updated);
    };

    const canAddDoor = doors.length < device.maxNodes && doors.every(door => door.nameTouched && door.isNameValid);

    const addDoor = () => {
        if (doors.length < device.maxNodes) {
            setDoors([...doors, { name: '', preferred: false, nameTouched: false, isNameValid: true }]);
        }
    };

    const removeDoor = () => {
        const updated = [{ ...doors[0], preferred: true }];
        setDoors(updated);
    };

    const saveDoors = async (event) => {
        event.preventDefault();
        const allValid = doors.every(door => door.nameTouched && door.isNameValid);
        if (!allValid) {
            const updated = doors.map(door => ({ ...door, isNameValid: door.nameTouched ? door.isNameValid : false }));
            setDoors(updated);
            return;
        }
        const nodes = doors.map((door, index) => ({
            nodeDevice: index + 1,
            nodeName: door.name,
            preferred: doors.length === 1 ? true : door.preferred
        }));
        const token = await auth0.getAccessTokenSilently();
        const response = await addUserDeviceNode(token, device.deviceId, nodes);
        setSucceeded(response.ok);
    };

    return (
        <>
            {succeeded
                ? <>
                    <div className="device-group">
                        <div className="border-success-icon">
                            <CheckCircle className="garage-success-text" />
                        </div>
                        <h2 className="device-text text garage-success-text">Successfully Added</h2>
                    </div>
                </>
                : <>
                    <div className="device-group">
                        <h2 className="device-text text">Add Garage Door</h2>
                        <p className="device-text text">{`${device.maxNodes - doors.length} of ${device.maxNodes} available`}</p>
                        <Divider />
                    </div>
                    <form onSubmit={saveDoors}>
                        {doors.map((door, index) =>
                            <div key={index}>
                                <div className="door-input-row">
                                    <TextField value={door.name} error={!door.isNameValid} onChange={(e) => handleNameChange(index, e)} variant="outlined" label="Door Name" className="door-name"/>
                                    <div style={{padding: '10px'}}>
                                        {index === doors.length - 1 &&
                                            (canAddDoor
                                                    ? <AddButton onClick={addDoor} />
                                                    : doors.length > 1 && <RemoveButton aria-label="Remove" onClick={removeDoor} />
                                            )
                                        }
                                    </div>
                                </div>
                                {doors.length > 1 &&
                                    <div className="account-row">
                                        <FormControlLabel control={<GreenCheckbox checked={door.preferred} onChange={() => handlePreferredChange(index)} />} label="Preferred"/>
                                    </div>
                                }
                            </div>
                        )}
                        <div className="tasks-button-group text">
                            <div className="task-button-container" onClick={(e) => { e.preventDefault(); onComplete(); }}>
                                <Button className="task-delete" startIcon={<Delete />}>Cancel</Button>
                            </div>
                            <div className="task-button-container">
                                <Button type="submit" startIcon={<Save />}>Save</Button>
                            </div>
                        </div>
                    </form>
                </>
            }
        </>
    );
}
