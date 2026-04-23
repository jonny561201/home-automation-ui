import React, { useContext, useState } from 'react';
import { updateUserPreferences } from '../../utilities/RestApi';
import { Context } from '../../state/Store';
import { Button, Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Delete, Save } from '@mui/icons-material';
import './SettingsEditPanel.scss'


export default function SettingsEditPanel(props) {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const preferences = state.preferences || {};
    const [edited, setEdited] = useState(false);
    const [garage, setGarage] = useState(state.garageDoors.find(x => x.nodeId === preferences.garageNodeId) || null);
    const [newCity, setNewCity] = useState(preferences.city || '');
    const [newTempUnit, setNewTempUnit] = useState(preferences.tempUnit || '');
    const [newMeasureUnit, setNewMeasureUnit] = useState(preferences.measureUnit || '');
    const [newAlertMinutes, setNewAlertMinutes] = useState(preferences.garageAlertTime || '');

    const savePreferences = async () => {
        if (!edited) return;
        const isFahrenheit = newTempUnit === "fahrenheit";
        const isImperial = newMeasureUnit === "imperial";
        const alertMinutes = newAlertMinutes === '' ? 0 : parseInt(newAlertMinutes, 10);
        const garageNodeId = garage ? garage.nodeId : null;
        const request = { isImperial, isFahrenheit, city: newCity, garageNodeId, garageAlertTime: alertMinutes };
        const token = await auth0.getAccessTokenSilently();
        await updateUserPreferences(token, request);

        dispatch({ type: 'SET_USER_PREFERENCES', payload: { ...state.preferences, city: newCity, tempUnit: newTempUnit, measureUnit: newMeasureUnit, garageNodeId: garageNodeId, garageAlertTime: alertMinutes } });
        props.setEditMode(false);
    }

    const cancelPreferences = () => {
        setNewCity(preferences.city || '');
        setNewTempUnit(preferences.tempUnit || '');
        setNewMeasureUnit(preferences.measureUnit || '');
        setNewAlertMinutes(preferences.garageAlertTime || '');
        props.setEditMode(false);
    }

    const setCity = (input) => {
        setEdited(true);
        setNewCity(input.target.value);
    }

    const updateTempRadioButton = (input) => {
        setEdited(true);
        setNewTempUnit(input.target.value);
    }

    const updateMeasureRadioButton = (input) => {
        setEdited(true);
        setNewMeasureUnit(input.target.value);
    }

    const updateGarageDoor = (input) => {
        const door = state.garageDoors.find(x => x.doorName === input.target.value) || null;
        setEdited(true);
        setGarage(door);
    }

    const updateAlertMinutes = (input) => {
        const value = input.target.value;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) <= 1440)) {
            setEdited(true);
            setNewAlertMinutes(value);
        }
    }

    return (
        <>
            <div className="settings-edit-panel text">
                <div>
                    <h2 className="panel-header-text">Garage</h2>
                    <Divider />
                    <div className="row">
                        <div className="col-lg-2 col-md-1 settings-edit-row">
                            <TextField className="settings-edit-garage" variant="outlined" select value={garage ? garage.doorName : ''} onChange={updateGarageDoor} label="Garage Door">
                                <MenuItem value="">None</MenuItem>
                                {state.garageDoors.map(x => (
                                    <MenuItem key={x.doorName} value={x.doorName}>
                                        {x.doorName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-lg-2 col-md-1 settings-edit-row">
                            <TextField className="settings-edit-garage" variant="outlined" label="Auto-Close Timer (min)" value={newAlertMinutes} onChange={updateAlertMinutes} placeholder="0 = disabled" />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="panel-header-text">Temperature</h2>
                    <Divider />
                    <div className="settings-edit-row">
                        <FormControl>
                            <RadioGroup className="settings-radio-group" label="Unit:">
                                <FormControlLabel onChange={updateTempRadioButton} value="fahrenheit" checked={newTempUnit === "fahrenheit"} control={<Radio color="primary"/>} label="Fahrenheit"/>
                                <FormControlLabel onChange={updateTempRadioButton} value="celsius" checked={newTempUnit === "celsius"} control={<Radio color="primary"/>} label="Celsius"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="settings-edit-row">
                        <TextField variant="outlined" label="City" value={newCity} onChange={setCity}/>
                    </div>
                </div>
                <div>
                    <h2 className="panel-header-text">Measurement</h2>
                    <Divider />
                    <div className="settings-edit-row">
                        <FormControl>
                            <RadioGroup className="settings-radio-group" label="Unit:">
                                <FormControlLabel onChange={updateMeasureRadioButton} value="imperial" checked={newMeasureUnit === "imperial"} control={<Radio color="primary" />} label="Imperial" />
                                <FormControlLabel onChange={updateMeasureRadioButton} value="metric" checked={newMeasureUnit === "metric"} control={<Radio color="primary" />} label="Metric" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                <Divider style={{ margin: '1rem 0 1rem 0' }} />
                <div className="settings-edit-actions">
                    <div className="settings-edit-action" onClick={cancelPreferences}>
                        <Button className="settings-edit-cancel" startIcon={<Delete />}>Cancel</Button>
                    </div>
                    <div className="settings-edit-action">
                        <Button className={edited ? "settings-edit-save" : "settings-edit-disabled"} disabled={!edited} onClick={savePreferences} startIcon={<Save />}>Save</Button>
                    </div>
                </div>
            </div>
        </>
    );
}