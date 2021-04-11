import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import Knob from '../../../components/controls/Knob';
import { getStore } from '../../../state/GlobalState';
import { debounchApi } from '../../../utilities/Services';
import { useInterval } from '../../../utilities/UseInterval';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TemperatureImage from '../segments/TemperatureImage';
import singleClickSound from '../../../resources/singleClick.mp3';
import TemperatureIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import { getCurrentTemperature, setUserTemperature } from '../../../utilities/RestApi';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Divider, FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
import './TemperaturePanel.css';
import { AutoSwitch, CoolSwitch, HeatSwitch } from '../../../components/controls/Switches';
import { CSSTransition } from 'react-transition-group';


export default function TemperaturePanel() {
    const [click] = useSound(singleClickSound, { volume: 0.25 });
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("heating");
    const [description, setDescription] = useState("");
    const [displayColor, setDisplayColor] = useState("#A0A0A0");
    const [isAuto, setIsAuto] = useState(false);
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
    }, []);

    useInterval(async () => {
        await getTempData();
    }, 60000);

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
        setIsAuto(response.mode === "auto" ? true : false);
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
        click();
        const heatState = (newMode === "heating" && !isHeating) ? true : false
        const coldState = (newMode === "cooling" && !isCooling) ? true : false;
        const autoState = (newMode === "auto" && !isAuto) ? true : false;
        const modeState = getToggledMode(heatState, coldState, autoState);
        setIsHeating(heatState);
        setIsCooling(coldState);
        setIsAuto(autoState)
        setMode(newMode);
        toggleColor(modeState);
        setUserTemperature(getStore().getUserId(), desiredTemp, modeState, isFahrenheit);
    }

    const getToggledMode = (heatState, coldState, autoState) => {
        if (heatState)
            return "heating";
        else if (coldState)
            return "cooling";
        else if (autoState)
            return "auto";
        return null;
    }

    const toggleColor = (mode) => {
        if (mode === "cooling")
            setDisplayColor("#27aedb");
        else if (mode === "heating")
            setDisplayColor("#db5127");
        else if (mode === "auto")
            setDisplayColor("#00c774");
        else
            setDisplayColor("#A0A0A0");
    }

    return (
        <div>
            <ExpansionPanel data-testid={"temperature-panel"} className="temperature-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => setOpen(!open)}>
                    <div className="summary">
                        <div>
                            <img alt="temperature" className="logo-image" src={TemperatureIcon} />
                        </div>
                        <div>
                            <Typography className="panel-text panel-header-text">Temperature</Typography>
                            {!open &&
                                <div className="small-text-container">
                                    <div className="small-text-group">
                                        <p className="small-text text">Outside:</p>
                                        <p className="small-text text">{externalTemp}&deg;</p>
                                    </div>
                                    <div className="small-text-group" style={{ marginLeft: '1rem' }}>
                                        <p className="small-text text">Inside:</p>
                                        <p className="small-text text">{internalTemp}&deg;</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                <div>
                    <div className="form-container">
                        <div className="form-column">
                            <div>
                                <TemperatureImage description={description} internal={internalTemp} external={externalTemp} />
                            </div>
                        </div>
                        <div className="form-column">
                            <Knob value={desiredTemp} lineCap={"round"} fgColor={displayColor} inputColor={displayColor}
                                onChange={knobChange} angleArc={240} angleOffset={240} min={minThermostatTemp} max={maxThermostatTemp} />
                            <FormControl>
                                <FormGroup>
                                    <FormControlLabel label="Auto" control={<AutoSwitch data-testid={"auto-switch"} checked={isAuto} onChange={() => toggleHvac("auto")} />} />
                                </FormGroup>
                            </FormControl>
                            <CSSTransition in={!isAuto} timeout={400} classNames="expansion" unmountOnExit appear >
                                <FormControl>
                                    <FormGroup>
                                        <FormControlLabel label="Heat" control={<HeatSwitch data-testid={"heating-switch"} checked={isHeating} onChange={() => toggleHvac("heating")} />} />
                                        <FormControlLabel label="Cool" control={<CoolSwitch data-testid={"cooling-switch"} checked={isCooling} onChange={() => toggleHvac("cooling")} />} />
                                    </FormGroup>
                                </FormControl>
                            </CSSTransition>
                        </div>
                    </div>
                </div>
            </ExpansionPanel>
        </div>
    );
}