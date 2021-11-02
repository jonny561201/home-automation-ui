import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import useSound from 'use-sound';
import { Save, Delete } from '@material-ui/icons';
import clickSound from '../../resources/click.mp3';
import SingleClickSound from '../../resources/singleClick.mp3';
import TempPicker from '../../components/controls/TempPicker';
import TimePicker from '../../components/controls/TimePicker';
import WeekPicker from '../../components/controls/WeekPicker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deleteScheduledTask } from '../../utilities/RestApi';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Divider, Switch } from '@material-ui/core';


export default function HvacActivity(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [state, dispatch] = useContext(Context);
    const [enabled, setEnabled] = useState(props.task.enabled);
    const [days, setDays] = useState(props.task.alarm_days);
    const [open, setOpen] = useState(false);
    const [inTemp, setInTemp] = useState(72);
    const [outTemp, setOutTemp] = useState(72);
    const [edited, setEdited] = useState(false);
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [singleClick] = useSound(SingleClickSound, { volume: 0.25 });
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays.map(day => props.task.alarm_days.includes(day.id) ? { ...day, on: true } : day));
    const [startTime, setStartTime] = useState(props.task.hvac_start);
    const [stopTime, setStopTime] = useState(props.task.hvac_stop);

    const updateStopTime = (dateTime) => {
        setEdited(true);
        setStopTime(dateTime);
    }

    const updateStartTime = (dateTime) => {
        setEdited(true);
        setStartTime(dateTime);
    }

    const clickDelete = async () => {
        click();
        const response = await deleteScheduledTask(state.user.userId, state.auth.bearer, props.task.task_id);
        if (response.ok) {
            dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: props.task.task_id });
        }
    }

    const saveTask = async () => {
        if (edited) {
            click();
            // const task = props.task;
            // const response = await updateScheduledTasks(state.user.userId, state.auth.bearer, task.task_id, task.alarm_light_group, task.alarm_group_name, days, time, enabled, type);
            // if (response) {
            //     dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: task.task_id });
            //     dispatch({ type: 'ADD_SCHEDULED_TASK', payload: response });
            // }
        }
    }

    const toggleDay = (task, newState) => {
        const newProjects = daysOfWeek.map(day => day.id === task.id
            ? { ...day, on: newState }
            : day
        );
        setDaysOfWeek(newProjects);
        setDays(newProjects.filter(x => x.on === true).map(y => y.id).join(''));
    }

    const toggleTask = async () => {
        singleClick();
        const updated = !enabled;
        setEnabled(updated)
        // const task = props.task;
        // const response = await updateScheduledTasks(state.user.userId, state.auth.bearer, task.task_id, task.alarm_light_group, task.alarm_group_name, days, time, updated, type);
        // if (response) {
        //     dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: task.task_id });
        //     dispatch({ type: 'ADD_SCHEDULED_TASK', payload: response });
        // }
    }

    return (
        <ExpansionPanel className="task-panel" expanded={open} onChange={() => { setOpen(!open) }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className="alarm-summary-panel">
                    <div className="alarm-setting-group" data-testid="light-alarm-group">
                        <div className="settings-row alarm-column-one">
                            <p className="setting panel-header-text alarm-time">{`${startTime.slice(0, -3)} - ${stopTime.slice(0, -3)}`}</p>
                        </div>
                        <div className="settings-row alarm-column-two">
                            <p className="setting text alarm-group-name">{props.task.task_type}</p>
                        </div>
                    </div>
                    <div className="alarm-setting-group">
                        <div className="settings-row alarm-column-one">
                            <p className="setting text measure-unit">{days}</p>
                        </div>
                        <div className="settings-row alarm-column-two">
                            <Switch className="task-switch" onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()}
                                checked={enabled} onChange={toggleTask} color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </div>

                    </div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="center">
                <div>
                    <div className="settings-row">
                        <div className="picker-row">
                            <TimePicker initialTime={startTime} setTime={updateStartTime} label="start time" />
                            <TimePicker initialTime={stopTime} setTime={updateStopTime} label="stop time" />
                        </div>
                    </div>
                    <div className="settings-row">
                        <div className="picker-row">
                            <TempPicker value={inTemp} onChange={setInTemp} label="Start Temp" />
                            <TempPicker value={outTemp} onChange={setOutTemp} label="Stop Temp" />
                        </div>
                    </div>
                    <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
                    <Divider />
                    <div className="tasks-button-group text">
                        <div className="task-button-container" onClick={clickDelete}>
                            <Delete className="task-button task-delete" />
                            <p className="task-delete">Delete</p>
                        </div>
                        <div className="task-button-container" onClick={saveTask}>
                            <Save className={`task-button ${edited ? "edited" : ""}`} />
                            <p className={edited ? "edited" : ''}>Update</p>
                        </div>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}