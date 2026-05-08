import React, { useContext, useState } from 'react';
import { updateUserPreferences } from '../../utilities/RestApi';
import { captureCurrentPosition } from '../../utilities/Location';
import { usStates } from '../../utilities/USStates';
import { Context } from '../../state/Store';
import { SET_USER_PREFERENCES } from '../../state/actions';
import { selectPreferredGarage } from '../../state/selectors';
import { Button, CircularProgress, Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { CheckCircle, Delete, ErrorOutline, MyLocation, Save } from '@mui/icons-material';
import './SettingsEditPanel.scss'


const ACCURACY_THRESHOLD_METERS = 100;

export default function SettingsEditPanel(props) {
    const [state, dispatch] = useContext(Context);
    const preferences = state.preferences || {};
    const initialCoords = (preferences.latitude && preferences.longitude)
        ? { latitude: preferences.latitude, longitude: preferences.longitude, accuracy: null }
        : null;
    const [edited, setEdited] = useState(false);
    const [garage, setGarage] = useState(selectPreferredGarage(state));
    const [newCity, setNewCity] = useState(preferences.city || '');
    const [newAddrState, setNewAddrState] = useState(preferences.state || '');
    const [newCoords, setNewCoords] = useState(initialCoords);
    const [capturing, setCapturing] = useState(false);
    const [gpsError, setGpsError] = useState('');
    const [newTempUnit, setNewTempUnit] = useState(preferences.tempUnit || '');
    const [newMeasureUnit, setNewMeasureUnit] = useState(preferences.measureUnit || '');
    const [newAlertMinutes, setNewAlertMinutes] = useState(preferences.garageAlertTime || '');

    const savePreferences = async () => {
        if (!edited) return;
        const isFahrenheit = newTempUnit === "fahrenheit";
        const isImperial = newMeasureUnit === "imperial";
        const alertMinutes = newAlertMinutes === '' ? 0 : parseInt(newAlertMinutes, 10);
        const garageNodeId = garage ? garage.nodeId : null;
        const request = { isImperial, isFahrenheit, city: newCity, state: newAddrState, garageNodeId, garageAlertTime: alertMinutes };
        if (newCoords) {
            request.latitude = newCoords.latitude;
            request.longitude = newCoords.longitude;
        }
        await updateUserPreferences(request);

        const payload = { ...state.preferences, city: newCity, state: newAddrState, tempUnit: newTempUnit, measureUnit: newMeasureUnit, garageNodeId: garageNodeId, garageAlertTime: alertMinutes };
        if (newCoords) {
            payload.latitude = newCoords.latitude;
            payload.longitude = newCoords.longitude;
        }
        dispatch({ type: SET_USER_PREFERENCES, payload });
        props.setEditMode(false);
    }

    const cancelPreferences = () => {
        setNewCity(preferences.city || '');
        setNewAddrState(preferences.state || '');
        setNewCoords(initialCoords);
        setGpsError('');
        setNewTempUnit(preferences.tempUnit || '');
        setNewMeasureUnit(preferences.measureUnit || '');
        setNewAlertMinutes(preferences.garageAlertTime || '');
        props.setEditMode(false);
    }

    const setCity = (input) => {
        setEdited(true);
        setNewCity(input.target.value);
    }

    const updateAddrState = (input) => {
        setEdited(true);
        setNewAddrState(input.target.value);
    }

    const captureLocation = async () => {
        setGpsError('');
        setCapturing(true);
        try {
            const position = await captureCurrentPosition();
            setNewCoords(position);
            setEdited(true);
        } catch (error) {
            setGpsError(error.message || "Couldn't get your location.");
        } finally {
            setCapturing(false);
        }
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

    const formatCoords = () => {
        if (!newCoords) return null;
        return newCoords.latitude.toFixed(5) + ', ' + newCoords.longitude.toFixed(5);
    }

    const isLowAccuracy = () => newCoords && newCoords.accuracy !== null && newCoords.accuracy > ACCURACY_THRESHOLD_METERS;

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
                    <div className="settings-edit-row settings-edit-location-row">
                        <TextField className="settings-edit-city" variant="outlined" label="City" value={newCity} onChange={setCity}/>
                        <TextField className="settings-edit-state" variant="outlined" select label="State" value={newAddrState} onChange={updateAddrState}>
                            <MenuItem value="">--</MenuItem>
                            {usStates.map(s =>
                                <MenuItem key={s.abbrev} value={s.abbrev}>{s.name} ({s.abbrev})</MenuItem>
                            )}
                        </TextField>
                    </div>
                    <div className="settings-edit-row settings-edit-gps-row">
                        <Button className="settings-edit-gps" variant="outlined" disabled={capturing} onClick={captureLocation}
                            startIcon={capturing ? <CircularProgress size={16} /> : <MyLocation />}>
                            {capturing ? 'Getting location…' : (newCoords ? 'Update GPS location' : 'Use My Location')}
                        </Button>
                        {newCoords &&
                            <span className={'settings-edit-coords ' + (isLowAccuracy() ? 'settings-edit-coords-warn' : 'settings-edit-coords-ok')}>
                                <CheckCircle fontSize="small" />
                                <span>{formatCoords()}{newCoords.accuracy !== null && ' (±' + newCoords.accuracy + ' m)'}</span>
                            </span>
                        }
                        {gpsError &&
                            <span className="settings-edit-coords settings-edit-coords-error">
                                <ErrorOutline fontSize="small" />
                                <span>{gpsError}</span>
                            </span>
                        }
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
