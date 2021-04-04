import React, { useState, useContext } from 'react';
import useSound from 'use-sound';
import ClickSound from '../../resources/click.mp3';
import { Context } from '../../state/Store';
import WeekPicker from '../../components/controls/WeekPicker';
import TimePicker from '../../components/controls/TimePicker';
import { getStore } from '../../state/GlobalState';
import { Save, Delete } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SingleClickSound from '../../resources/singleClick.mp3';
import { deleteScheduledTask, updateScheduledTasks } from '../../utilities/RestApi';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Divider, Switch, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


export default function LightActivity(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [click] = useSound(ClickSound, { volume: 0.25 });
    const [singleClick] = useSound(SingleClickSound, { volume: 0.25 });
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [type, setType] = useState(props.task.task_type);
    const [days, setDays] = useState(props.task.alarm_days);
    const [time, setTime] = useState(props.task.alarm_time);
    const [enabled, setEnabled] = useState(props.task.enabled);
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays.map(day => props.task.alarm_days.includes(day.id) ? { ...day, on: true } : day));

    const updateTime = (dateTime) => {
        setEdited(true);
        setTime(dateTime);
    }

    const saveTask = async () => {
        if (edited) {
            click();
            const task = props.task;
            const response = await updateScheduledTasks(getStore().getUserId(), task.task_id, task.alarm_light_group, task.alarm_group_name, days, time, enabled, type);
            if (response) {
                dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: task.task_id });
                dispatch({ type: 'ADD_SCHEDULED_TASK', payload: response });
            }
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

    const clickDelete = async () => {
        click();
        const response = await deleteScheduledTask(getStore().getUserId(), props.task.task_id);
        if (response.ok) {
            dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: props.task.task_id });
        }
    }

    const toggleTask = async () => {
        singleClick();
        const updated = !enabled;
        setEnabled(updated)
        const task = props.task;
        const response = await updateScheduledTasks(getStore().getUserId(), task.task_id, task.alarm_light_group, task.alarm_group_name, days, time, updated, type);
        if (response) {
            dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: task.task_id });
            dispatch({ type: 'ADD_SCHEDULED_TASK', payload: response });
        }
    }

    const updateSelectedType = (item) => {
        setEdited(true);
        setType(state.taskTypes.find(x => x === item.target.value));
    }

    return (
        <>
            <ExpansionPanel className="task-panel" expanded={open} onChange={() => { setOpen(!open) }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="alarm-summary-panel">
                        <div className="alarm-setting-group" data-testid="light-alarm-group">
                            <div className="settings-row alarm-column-one">
                                <p className="setting panel-header-text alarm-time">{time.slice(0, -3)}</p>
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
                        <div style={{ display: 'flex' }}>
                            <FormControl className="light-alarm-component" variant="outlined">
                                <InputLabel id="light-group-dropdown">Task Type</InputLabel>
                                <Select
                                    value={type}
                                    onChange={updateSelectedType}
                                    label="Task Type"
                                >
                                    {state.taskTypes.map(x => (
                                        <MenuItem key={x} value={x}>
                                            {x}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TimePicker className="light-alarm-component" initialTime={time} setTime={updateTime} />
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
        </>
    )
}