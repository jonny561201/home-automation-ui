import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Divider, FormControl, FormGroup, Switch, FormControlLabel } from '@material-ui/core';
import './TemperaturePanel.css';
import TemperatureIcon from '../../resources/panelIcons/TemperatureIcon.jpg';
import { getCurrentTemperature, setUserTemperature } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';
import { debounchApi } from '../../utilities/Services';
import TemperatureImage from '../segments/TemperatureImage';
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
        getTempData();
        const interval = setInterval(() => {
            getTempData();
        }, 120000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const getTempData = async () => {
        const response = await getCurrentTemperature(getStore().getUserId());
        console.log(`WeatherResponse:`, JSON.stringify(response))
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
        toggleColor(response.mode);
    };

    const knobChange = (newValue) => {
        if (isHeating || isCooling) {
            setDesiredTemp(newValue);
            debounchApi(() => setUserTemperature(getStore().getUserId(), newValue, mode, isFahrenheit));
        }
    }

    const toggleHvac = (newMode) => {
        const heatState = (newMode === "heating" && !isHeating) ? true : false
        const coldState = (newMode === "cooling" && !isCooling) ? true : false;
        const modeState = getToggledMode(heatState, coldState);
        setIsHeating(heatState);
        setIsCooling(coldState);
        setMode(newMode);
        toggleColor(modeState);
        setUserTemperature(getStore().getUserId(), desiredTemp, modeState, isFahrenheit);
    }

    const getToggledMode = (heatState, coldState) => {
        if (heatState)
            return "heating";
        else if (coldState)
            return "cooling";
        return null;
    }

    const toggleColor = (mode) => {
        if (mode === "cooling")
            setDisplayColor("#27aedb");
        else if (mode === "heating")
            setDisplayColor("#db5127");
        else
            setDisplayColor("#A0A0A0");
    }

    return (
        <div>
            <ExpansionPanel data-testid={"temperature-panel"} className="temperature-panel">
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
                                <p data-testid={"internal-temp"} className="internal-temp">{internalTemp}&deg;</p>
                                <p data-testid={"external-temp"} className="external-temp">{externalTemp}&deg;</p>
                            </div>
                        </div>
                        <div className="form-column">
                            <Knob value={desiredTemp} lineCap={"round"} fgColor={displayColor} inputColor={displayColor}
                                onChange={knobChange} angleArc={240} angleOffset={240} min={minThermostatTemp} max={maxThermostatTemp} />
                            <FormControl>
                                <FormGroup>
                                    <FormControlLabel label="Heat" control={<Switch data-testid={"heating-switch"} color="secondary" checked={isHeating} onChange={() => toggleHvac("heating")} />} />
                                    <FormControlLabel label="Cool" control={<Switch data-testid={"cooling-switch"} color="primary" checked={isCooling} onChange={() => toggleHvac("cooling")} />} />
                                </FormGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </ExpansionPanel>
        </div>
    );
}