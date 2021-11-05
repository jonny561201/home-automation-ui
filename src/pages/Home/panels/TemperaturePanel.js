import React, { useState, useContext } from 'react';
import useSound from 'use-sound';
import Knob from '../../../components/controls/Knob';
import { debounchApi } from '../../../utilities/Services';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TemperatureImage from '../segments/TemperatureImage';
import singleClickSound from '../../../resources/singleClick.mp3';
import TemperatureIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import { setUserTemperature } from '../../../utilities/RestApi';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Divider, FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
import './TemperaturePanel.css';
import { AutoSwitch, CoolSwitch, HeatSwitch } from '../../../components/controls/Switches';
import { CSSTransition } from 'react-transition-group';
import { Context } from '../../../state/Store';


export default function TemperaturePanel() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [click] = useSound(singleClickSound, { volume: 0.25 });

    const knobChange = (newValue) => {
        if (state.tempData.mode === 'heating' || state.tempData.mode === 'cooling') {
            dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, desiredTemp: newValue } });
            debounchApi(() => setUserTemperature(state.user.userId, state.auth.bearer, newValue, state.tempData.mode, state.tempData.isFahrenheit));
        }
    }

    const toggleHvac = async (newMode) => {
        if (newMode !== 'auto' || state.tasks.some(x => x.task_type === 'hvac')) {
            click();
            const modeState = state.tempData.mode === newMode ? null : newMode;
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: modeState } });
            setUserTemperature(state.user.userId, state.auth.bearer, state.tempData.desiredTemp, modeState, state.tempData.isFahrenheit);
        }
    }

    return (
        <div>
            <ExpansionPanel data-testid={"temperature-panel"} className="temperature-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => setOpen(!open)}>
                    <div className="summary">
                        <img alt="temperature" className="logo-image" src={TemperatureIcon} />
                        <div>
                            <Typography className="panel-text panel-header-text">Temperature</Typography>
                            {!open &&
                                <div className="small-text-container">
                                    <div className="small-text-group">
                                        <p className="small-text text">Outside:</p>
                                        <p className="small-text text">{state.tempData.temp}&deg;</p>
                                    </div>
                                    <div className="small-text-group" style={{ marginLeft: '1rem' }}>
                                        <p className="small-text text">Inside:</p>
                                        <p className="small-text text">{state.tempData.currentTemp}&deg;</p>
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
                            <TemperatureImage />
                        </div>
                        <div className="form-column">
                            <Knob value={state.tempData.currentDesiredTemp} lineCap={"round"} inputColor={state.tempData.gaugeColor} fgColor={state.tempData.gaugeColor} title="Desired Temp"
                                onChange={knobChange} angleArc={240} angleOffset={240} min={state.tempData.minThermostatTemp} max={state.tempData.maxThermostatTemp} />
                            {
                                state.tasks.some(x => x.task_type === 'hvac') ?
                                    <FormControl>
                                        <FormGroup>
                                            <FormControlLabel label="Auto" control={<AutoSwitch data-testid={"auto-switch"} checked={state.tempData.mode === 'auto' && state.tasks.some(x => x.task_type === 'hvac')} onChange={() => toggleHvac("auto")} />} />
                                        </FormGroup>
                                    </FormControl>
                                    : null
                            }
                            <CSSTransition in={state.tempData.mode !== 'auto' || !state.tasks.some(x => x.task_type === 'hvac')} timeout={400} classNames="expansion" unmountOnExit appear >
                                <FormControl>
                                    <FormGroup>
                                        <FormControlLabel label="Heat" control={<HeatSwitch data-testid={"heating-switch"} checked={state.tempData.mode === 'heating'} onChange={() => toggleHvac("heating")} />} />
                                        <FormControlLabel label="Cool" control={<CoolSwitch data-testid={"cooling-switch"} checked={state.tempData.mode === 'cooling'} onChange={() => toggleHvac("cooling")} />} />
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