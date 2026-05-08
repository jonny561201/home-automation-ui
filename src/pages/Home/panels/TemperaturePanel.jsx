import React, { useState, useContext } from 'react';
import Knob from '../../../components/controls/Knob';
import { debounceApi } from '../../../utilities/Services';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TemperatureImage from '../segments/TemperatureImage';
import WeatherForecast from '../segments/WeatherForecast';
import TemperatureIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import { setUserTemperature } from '../../../utilities/RestApi';
import { parseDate } from '../../../utilities/Services';
import { Accordion, AccordionDetails, Typography, AccordionSummary, Divider, FormControl, FormGroup, FormControlLabel } from '@mui/material';
import { AutoSwitch, CoolSwitch, HeatSwitch } from '../../../components/controls/Switches';
import { Context } from '../../../state/Store';
import { SET_TEMP_DATA } from '../../../state/actions';
import { hasHvacTasks } from '../../../state/selectors';
import './TemperaturePanel.scss';


export default function TemperaturePanel() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);

    const formatInsideTemp = () => {
        if (state.tempData.currentTemp == null) return '--';
        return state.tempData.currentTemp + '°';
    };

    const knobChange = async (newValue) => {
        if (state.tempData.mode === 'heating' || state.tempData.mode === 'cooling') {
            dispatch({ type: SET_TEMP_DATA, payload: { ...state.tempData, desiredTemp: newValue } });
            debounceApi(() => {
                setUserTemperature(newValue, state.tempData.mode, state.tempData.isFahrenheit);
            });
        }
    }

    const getSchedulePreview = () => {
        if (state.tempData.mode !== 'auto') return null;
        const hvacTasks = state.tasks.filter(x => x.taskType === 'hvac' && x.enabled);
        if (hvacTasks.length === 0) return null;
        const now = new Date();
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = dayNames[now.getDay()];
        const activeTask = hvacTasks.find(x => now > parseDate(x.hvacStart) && now < parseDate(x.hvacStop) && x.alarmDays.includes(today));
        if (activeTask) {
            return { active: true, text: 'Active: ' + activeTask.hvacStartTemp + '° until ' + activeTask.hvacStop.slice(0, -3) };
        }
        const upcomingToday = hvacTasks.find(x => now < parseDate(x.hvacStart) && x.alarmDays.includes(today));
        if (upcomingToday) {
            return { active: false, text: 'Next: ' + upcomingToday.hvacStartTemp + '° at ' + upcomingToday.hvacStart.slice(0, -3) };
        }
        for (let i = 1; i <= 7; i++) {
            const nextDay = dayNames[(now.getDay() + i) % 7];
            const nextTask = hvacTasks.find(x => x.alarmDays.includes(nextDay));
            if (nextTask) {
                return { active: false, text: 'Next: ' + nextTask.hvacStartTemp + '° ' + nextDay + ' at ' + nextTask.hvacStart.slice(0, -3) };
            }
        }
        return null;
    };

    const toggleHvac = async (newMode) => {
        if (newMode !== 'auto' || hasHvacTasks(state)) {
            const modeState = state.tempData.mode === newMode ? null : newMode;
            await dispatch({ type: SET_TEMP_DATA, payload: { ...state.tempData, mode: modeState } });
            setUserTemperature(state.tempData.desiredTemp, modeState, state.tempData.isFahrenheit);
        }
    }

    return (
        <div>
            <Accordion className="temperature-panel">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setOpen(!open)}>
                    <div className="summary">
                        <img alt="temperature" className="logo-image" src={TemperatureIcon} />
                        <div>
                            <Typography className="panel-text panel-header-text">Temperature</Typography>
                            {!open &&
                                <div className="small-text-container">
                                    <div className="small-text-group">
                                        <p className="small-text text">Outside:</p>
                                        <p className="small-text text">{state.forecastData.temp}&deg;</p>
                                    </div>
                                    <div className="small-text-group" style={{ marginLeft: '1rem' }}>
                                        <p className="small-text text">Inside:</p>
                                        <p className="small-text text">{formatInsideTemp()}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <div className="temperature-panel-content">
                        <div className="form-container">
                            <div className="form-column image-column">
                                <TemperatureImage />
                            </div>
                            <div className="form-column gauge-column">
                                <Knob value={state.tempData.currentDesiredTemp} lineCap={"round"} inputColor={state.tempData.gaugeColor} fgColor={state.tempData.gaugeColor} fgGradient={state.tempData.gaugeGradient} title="Desired Temp"
                                    onChange={knobChange} angleArc={240} angleOffset={240} min={state.tempData.minThermostatTemp} max={state.tempData.maxThermostatTemp} />
                                {
                                    hasHvacTasks(state) ?
                                        <FormControl>
                                            <FormGroup>
                                                <FormControlLabel label="Auto" control={<AutoSwitch checked={state.tempData.mode === 'auto' && hasHvacTasks(state)} onChange={() => toggleHvac("auto")} />} />
                                            </FormGroup>
                                        </FormControl>
                                        : null
                                }
                                {(state.tempData.mode !== 'auto' || !hasHvacTasks(state)) && (
                                    <FormControl>
                                        <FormGroup>
                                            <FormControlLabel label="Heat" control={<HeatSwitch checked={state.tempData.mode === 'heating'} onChange={() => toggleHvac("heating")} />} />
                                            <FormControlLabel label="Cool" control={<CoolSwitch checked={state.tempData.mode === 'cooling'} onChange={() => toggleHvac("cooling")} />} />
                                        </FormGroup>
                                    </FormControl>
                                )}
                                {getSchedulePreview() &&
                                    <div className="schedule-preview">
                                        <span className={'schedule-indicator' + (getSchedulePreview().active ? ' schedule-active' : ' schedule-idle')} />
                                        <p className="schedule-preview-text text">{getSchedulePreview().text}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <Divider />
                        <WeatherForecast />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}