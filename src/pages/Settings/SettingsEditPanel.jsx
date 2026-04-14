import React, { useState, useContext } from 'react';
import { updateUserPreferences } from '../../utilities/RestApi';
import { Context } from '../../state/Store';
import { Divider, TextField, MenuItem, FormControlLabel, RadioGroup, FormControl, Radio, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import './SettingsEditPanel.scss'
import { Delete, Save } from '@mui/icons-material';


export default function SettingsEditPanel(props) {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [edited, setEdited] = useState(false);
    const [garage, setGarage] = useState(state.preferences.garage_door ? state.preferences.garage_door : '');
    const [garageId, setGarageId] = useState();
    const [newCity, setNewCity] = useState(state.preferences.city);
    const [newTempUnit, setNewTempUnit] = useState(state.preferences.temp_unit);
    const [newMeasureUnit, setNewMeasureUnit] = useState(state.preferences.measure_unit);

    const savePreferences = async () => {
        const isFahrenheit = newTempUnit === "fahrenheit";
        const isImperial = newMeasureUnit === "imperial";
        const request = { isImperial, isFahrenheit, 'city': newCity, 'garageDoor': garage, 'garageId': garageId };
        const token = await auth0.getAccessTokenSilently();
        await updateUserPreferences(token, request);

        dispatch({ type: 'SET_USER_PREFERENCES', payload: { ...state.preferences, city: newCity, temp_unit: newTempUnit, measure_unit: newMeasureUnit, garage_id: garageId, garage_door: garage } });
        props.setEditMode(false);
    }

    const cancelPreferences = () => {
        setNewCity(props.city);
        setNewTempUnit(props.tempUnit);
        setNewMeasureUnit(props.measureUnit);
        props.setEditMode(false);
    }

    const updateCity = (input) => {
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
        const door = state.garageDoors.find(x => x.doorName === input.target.value);
        setEdited(true);
        setGarage(input.target.value);
        setGarageId(door ? door.doorId : null);
    }

    return (
        <>
            <div className="settings-edit-panel text">
                <h2 className="panel-header-text">Garage</h2>
                <Divider />
                <div className="settings-edit-row">
                    <TextField className="settings-edit-garage" variant="outlined" select value={garage} onChange={updateGarageDoor} label="Garage Door">
                        <MenuItem value="">None</MenuItem>
                        {state.garageDoors.map(x => (
                            <MenuItem key={x.doorName} value={x.doorName}>
                                {x.doorName}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <h2 className="panel-header-text">Temperature</h2>
                <Divider />
                <div className="settings-edit-row">
                    <FormControl>
                        <RadioGroup row label="Unit:">
                            <FormControlLabel onChange={updateTempRadioButton} value="fahrenheit" checked={newTempUnit === "fahrenheit"} control={<Radio color="primary" />} label="Fahrenheit" />
                            <FormControlLabel onChange={updateTempRadioButton} value="celsius" checked={newTempUnit === "celsius"} control={<Radio color="primary" />} label="Celsius" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="settings-edit-row">
                    <TextField variant="outlined" label="City" value={newCity} onChange={updateCity} />
                </div>
                <h2 className="panel-header-text">Measurement</h2>
                <Divider />
                <div className="settings-edit-row">
                    <FormControl>
                        <RadioGroup row label="Unit:">
                            <FormControlLabel onChange={updateMeasureRadioButton} value="imperial" checked={newMeasureUnit === "imperial"} control={<Radio color="primary" />} label="Imperial" />
                            <FormControlLabel onChange={updateMeasureRadioButton} value="metric" checked={newMeasureUnit === "metric"} control={<Radio color="primary" />} label="Metric" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <Divider style={{ margin: '1rem 0 1rem 0' }} />
                <div className="settings-edit-actions">
                    <div className="settings-edit-action" onClick={cancelPreferences}>
                        <Button className="settings-edit-cancel" startIcon={<Delete />}>Cancel</Button>
                    </div>
                    <div className="settings-edit-action">
                        <Button className="settings-edit-save" onClick={savePreferences} startIcon={<Save />}>Save</Button>
                    </div>
                </div>
            </div>
        </>
    );
}