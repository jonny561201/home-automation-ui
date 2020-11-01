import React, { useState } from 'react';
import { Divider, TextField, FormControlLabel, RadioGroup, FormControl, Radio } from '@material-ui/core';
import { updateUserPreferences } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';
import TimePicker from '../controls/TimePicker';


export default function SettingsEditPanel(props) {
    const [time, setTime] = useState();
    const [edited, setEdited] = useState();
    const [newCity, setNewCity] = useState(props.city);
    const [newTempUnit, setNewTempUnit] = useState(props.tempUnit);
    const [newMeasureUnit, setNewMeasureUnit] = useState(props.measureUnit);

    const savePreferences = () => {
        const isFahrenheit = newTempUnit === "fahrenheit";
        const isImperial = newMeasureUnit === "imperial";
        updateUserPreferences(getStore().getUserId(), isFahrenheit, isImperial, newCity, time);
        setEdited(true);
        props.setCity(newCity);
        props.setTempUnit(newTempUnit);
        props.setEditMode(!props.isEditMode)
        props.setMeasureUnit(newMeasureUnit);
    }

    const cancelPreferences = () => {
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

    const updateTime = (dateTime) => {
        setTime(dateTime);
    }

    return (
        <div className="settings-wrapper">
            <div className="settings-group settings-text">
                <h2>Temperature</h2>
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
                <h2>Measurement</h2>
                <Divider />
                <div className="settings-row">
                    <FormControl>
                        <RadioGroup label="Unit:">
                            <FormControlLabel onChange={updateMeasureRadioButton} value="imperial" checked={newMeasureUnit === "imperial"} control={<Radio color="primary" />} label="Imperial" />
                            <FormControlLabel onChange={updateMeasureRadioButton} value="metric" checked={newMeasureUnit === "metric"} control={<Radio color="primary" />} label="Metric" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <h2>Light Alarm</h2>
                <Divider />
                <TimePicker setTime={updateTime}/>
            </div>
            <Divider />
            <button className="submit" disabled={!edited} onClick={savePreferences}>Save</button>
            <button className="cancel" onClick={cancelPreferences}>Cancel</button>
        </div>
    );
}