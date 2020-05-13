import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Divider, FormControl, FormGroup, Switch, FormControlLabel } from '@material-ui/core';
import './TemperaturePanel.css';
import TemperatureIcon from '../../resources/panelIcons/TemperatureIcon.jpg';
import { getCurrentTemperature, setUserTemperature } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';
import { debounchApi } from '../../utilities/Services';
import TemperatureImage from './TemperatureImage';
import Knob from '../controls/Knob';


export default function TemperaturePanel() {
    const [mode, setMode] = useState("heating");
    const [description, setDescription] = useState("");
    const [displayColor, setDisplayColor] = useState("#A0A0A0");
    const [isHeating, setIsHeating] = useState(false);
    const [isCooling, setIsCooling] = useState(false);
    const [isFahrenheit, setIsFahrenheit] = useState(true);
    const [desiredTemp, setDesiredTemp] = useState(0.0);
    const [externalTemp, setExternalTemp] = useState(0.0);
    const [internalTemp, setInternalTemp] = useState(0.0);
    const [minThermostatTemp, setMinThermostatTemp] = useState(0.0);
    const [maxThermostatTemp, setMaxThermostatTemp] = useState(0.0);


    useEffect(() => {
        const getTempData = async () => {
            const response = await getCurrentTemperature(getStore().getUserId());
            setExternalTemp(Math.round(response.temp));
            setInternalTemp(Math.round(response.currentTemp));
            setIsFahrenheit(response.isFahrenheit);
            setDesiredTemp(response.desiredTemp === null ? parseFloat(response.currentTemp.toFixed(0)) : parseFloat(response.desiredTemp.toFixed(0)));
            setMinThermostatTemp(response.minThermostatTemp);
            setMaxThermostatTemp(response.maxThermostatTemp);
            setIsCooling(response.mode === "cooling" ? true : false);
            setIsHeating(response.mode === "heating" ? true : false);
            setMode(response.mode);
            setDescription(response.description);
            toggle(response.mode);
        };
        getTempData();
    }, []);

    const knobChange = (newValue) => {
        if (isHeating || isCooling) {
            setDesiredTemp(newValue);
            debounchApi(() => setUserTemperature(getStore().getUserId(), newValue, mode, isFahrenheit));
        }
    }

    const toggleHvac = (newMode) => {
        let modeState = null;
        if (newMode === "heating") {
            const heating = !isHeating
            setIsHeating(heating);
            setIsCooling(false);
            modeState = heating ? "heating" : null    
            setUserTemperature(getStore().getUserId(), desiredTemp, newMode, isFahrenheit);
        } else if (newMode === "cooling") {
            const cooling = !isCooling;
            setIsHeating(false);
            setIsCooling(cooling);   
            modeState = cooling ? "cooling" : null;
            setUserTemperature(getStore().getUserId(), desiredTemp, newMode, isFahrenheit);
        } 
        if (modeState === null) {
            setIsHeating(false);
            setIsCooling(false);
            setUserTemperature(getStore().getUserId(), desiredTemp, null, isFahrenheit);
        }
        setMode(newMode);
        toggle(modeState);
    }

    const toggle = (mode) => {
        if (mode === "cooling") {
            setDisplayColor("#27aedb");
        } else if (mode === "heating") {
            setDisplayColor("#db5127");
        } else {
            setDisplayColor("#A0A0A0");
        }
    }

    return (
        <div>
            <ExpansionPanel className="temperature-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="temperature" className="logo-image" src={TemperatureIcon} />
                        </div>
                        <Typography className="panel-text">Temperature</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                <div>
                    <div className="form-container">
                        <div className="form-column">
                            <div >
                                <TemperatureImage description={description} />
                                <p className="internal-temp">{internalTemp}&deg;</p>
                                <p className="external-temp">{externalTemp}&deg;</p>
                            </div>
                        </div>
                        <div className="form-column">
                            <Knob value={desiredTemp} lineCap={"round"} fgColor={displayColor} inputColor={displayColor}
                                onChange={knobChange} angleArc={240} angleOffset={240} min={minThermostatTemp} max={maxThermostatTemp} />
                            <FormControl>
                                <FormGroup>
                                    <FormControlLabel label="Heat" control={<Switch color="secondary" checked={isHeating} onChange={() => toggleHvac("heating")} />} />
                                    <FormControlLabel label="Cool" control={<Switch color="primary" checked={isCooling} onChange={() => toggleHvac("cooling")} />} />
                                </FormGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </ExpansionPanel>
        </div>
    );
}