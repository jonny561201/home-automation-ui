import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../state/Store';
import { updateUserPreferences } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import { Divider, TextField, FormControlLabel, RadioGroup, FormControl, Radio, MenuItem, Select, InputLabel } from '@material-ui/core';
import './SettingsEditPanel.css'


export default function SettingsEditPanel(props) {
    const [state,] = useContext(Context);
    const [edited, setEdited] = useState();
    const [groupId,] = useState(props.groupId);
    const [time, setTime] = useState(props.time);
    const [newCity, setNewCity] = useState(props.city);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [newTempUnit, setNewTempUnit] = useState(props.tempUnit);
    const [newMeasureUnit, setNewMeasureUnit] = useState(props.measureUnit);

    useEffect(() => {
        if (state.userLightGroups.filter(x => x.groupName === props.groupName).length > 0)
            setSelectedRoom(props.groupName);
    }, []);

    const savePreferences = () => {
        const isFahrenheit = newTempUnit === "fahrenheit";
        const isImperial = newMeasureUnit === "imperial";
        const lightGroup = state.userLightGroups.find(x => x.groupName === selectedRoom);
        const lightDays = state.daysOfWeek.filter(x => x.on === true).map(y => y.id).join('')
        lightGroup
            ? updateUserPreferences(getStore().getUserId(), isFahrenheit, isImperial, newCity, time, lightDays, lightGroup.groupId, selectedRoom)
            : updateUserPreferences(getStore().getUserId(), isFahrenheit, isImperial, newCity, time, lightDays, groupId, props.groupName)

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
        setEdited(true);
        setTime(dateTime);
    }

    const updateSelectedRoom = (item) => {
        setEdited(true);
        setSelectedRoom(item.target.value)
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
                {
                    state.roles.some(x => x.role_name === 'lighting') &&
                    <>
                        <h2>Light Alarm</h2>
                        <Divider />
                        <div className="settings-row">
                            <FormControl className="light-alarm-component settings-first-item" variant="outlined">
                                <InputLabel id="light-group-dropdown">Room</InputLabel>
                                <Select
                                    data-testid="alarm-room-picker"
                                    id="settings-light-rooms"
                                    value={selectedRoom}
                                    onChange={updateSelectedRoom}
                                    label="Room"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {state.userLightGroups.map((group) => (
                                        <MenuItem key={group.groupId} value={group.groupName}>
                                            {group.groupName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TimePicker className="light-alarm-component" initialTime={props.time} setTime={updateTime} />
                        </div>
                        <WeekPicker setEdited={() => setEdited(true)} />
                    </>

                }
            </div>
            <Divider />
            <button className="submit" disabled={!edited} onClick={savePreferences}>Save</button>
            <button className="cancel" onClick={cancelPreferences}>Cancel</button>
        </div>
    );
}