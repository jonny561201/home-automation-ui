import React, { useState, useContext } from 'react';
import useSound from 'use-sound';
import clickSound from '../../resources/click.mp3';
import { updateUserPreferences } from '../../utilities/RestApi';
import { Divider, TextField, FormControlLabel, RadioGroup, FormControl, Radio } from '@material-ui/core';
import './SettingsEditPanel.css'
import { Context } from '../../state/Store';


export default function SettingsEditPanel(props) {
    const [state, dispatch] = useContext(Context);
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [edited, setEdited] = useState();
    const [newCity, setNewCity] = useState(state.preferences.city);
    const [newTempUnit, setNewTempUnit] = useState(state.preferences.temp_unit);
    const [newMeasureUnit, setNewMeasureUnit] = useState(state.preferences.measure_unit);

    const savePreferences = () => {
        click();
        const isFahrenheit = newTempUnit === "fahrenheit";
        const isImperial = newMeasureUnit === "imperial";
        updateUserPreferences(state.user.userId, isFahrenheit, isImperial, newCity);

        props.setEditMode(!props.isEditMode)
        dispatch({ type: 'SET_USER_PREFERENCES', payload: { ...state.preferences, city: newCity, temp_unit: newTempUnit, measure_unit: newMeasureUnit } });
    }

    const cancelPreferences = () => {
        click();
        setNewCity(props.city);
        setNewTempUnit(props.tempUnit);
        setNewMeasureUnit(props.measureUnit);
        props.setEditMode(!props.isEditMode)
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

    return (
        <>
            <div className="settings-group setting text">
                <h2 className="panel-header-text">Temperature</h2>
                <Divider />
                <div className="settings-row">
                    <FormControl>
                        <RadioGroup label="Unit:">
                            <FormControlLabel onChange={updateTempRadioButton} value="fahrenheit" checked={newTempUnit === "fahrenheit"} control={<Radio color="primary" />} label="Fahrenheit" />
                            <FormControlLabel onChange={updateTempRadioButton} value="celsius" checked={newTempUnit === "celsius"} control={<Radio color="primary" />} label="Celsius" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="settings-row">
                    <TextField variant="outlined" label="City" value={newCity} onChange={updateCity} />
                </div>
                <h2 className="panel-header-text">Measurement</h2>
                <Divider />
                <div className="settings-row">
                    <FormControl>
                        <RadioGroup label="Unit:">
                            <FormControlLabel onChange={updateMeasureRadioButton} value="imperial" checked={newMeasureUnit === "imperial"} control={<Radio color="primary" />} label="Imperial" />
                            <FormControlLabel onChange={updateMeasureRadioButton} value="metric" checked={newMeasureUnit === "metric"} control={<Radio color="primary" />} label="Metric" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <Divider />
            <div className="settings-button-group">
                <button className="submit success-ripple" disabled={!edited} onClick={savePreferences}>Save</button>
                <button className="cancel cancel-ripple" onClick={cancelPreferences}>Cancel</button>
            </div>
        </>
    );
}