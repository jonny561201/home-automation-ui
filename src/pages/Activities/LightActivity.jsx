import React, {useContext, useState} from 'react';
import {Context} from '../../state/Store';
import WeekPicker from '../../components/controls/WeekPicker';
import TimePicker from '../../components/controls/TimePicker';
import {Delete, Save} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {deleteScheduledTask, updateScheduledTasks} from '../../utilities/RestApi';
import {Accordion, AccordionDetails, AccordionSummary, Divider, MenuItem, Switch, TextField} from '@mui/material';
import {useAuth0} from "@auth0/auth0-react";


export default function LightActivity(props) {
    const auth0 = useAuth0();
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [type, setType] = useState(props.task.taskType);
    const [days, setDays] = useState(props.task.alarmDays);
    const [time, setTime] = useState(props.task.alarmTime);
    const [enabled, setEnabled] = useState(props.task.enabled);
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays.map(day => props.task.alarmDays.includes(day.id) ? { ...day, on: true } : day));

    const updateTime = (dateTime) => {
        setEdited(true);
        setTime(dateTime);
    }

    const saveTask = async () => {
        if (edited) {
            await updateTask(enabled);
        }
    }

    const toggleTask = async () => {
        const updated = !enabled;
        setEnabled(updated);
        await updateTask(updated);
    }

    const updateTask = async (isEnabled) => {
        const request = { 'taskId': props.task.taskId, 'alarmLightGroup': props.task.alarmLightGroup, 'alarmGroupName': props.task.alarmGroupName, 'alarmDays': days, 'alarmTime': time, 'enabled': isEnabled, 'taskType': type };
        const token = await auth0.getAccessTokenSilently();
        const response = await updateScheduledTasks(token, request);
        if (response) {
            dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: props.task.taskId });
            dispatch({ type: 'ADD_SCHEDULED_TASK', payload: response });
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
        const token = await auth0.getAccessTokenSilently();
        const response = await deleteScheduledTask(token, props.task.taskId);
        if (response.ok) {
            dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: props.task.taskId });
        }
    }

    const updateSelectedType = (item) => {
        setEdited(true);
        setType(state.taskTypes.find(x => x === item.target.value));
    }

    return (
        <>
            <Accordion expanded={open} onChange={() => { setOpen(!open) }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="alarm-summary-panel">
                        <div className="alarm-setting-group">
                            <p className="text activity-group-name">{props.task.taskType} - {props.task.alarmGroupName}</p>
                        </div>
                        <div className="alarm-setting-group">
                            <div className="alarm-column-one">
                                <p className="panel-header-text alarm-time">{time.slice(0, -3)}</p>
                            </div>
                            <div className="alarm-column-two">
                                <Switch onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()}
                                    checked={enabled} onChange={toggleTask} color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                            </div>
                        </div>
                        <div className="alarm-setting-group">
                            <div className="alarm-column-one">
                                <p className="text activity-subtext">{days}</p>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="center">
                    <div className="activity-detail-panel">
                        <div style={{ display: 'flex' }}>
                            <TextField className="light-alarm-component" select variant="outlined" value={type} onChange={updateSelectedType} label="Task Type">
                                {state.taskTypes.map(x => (
                                    <MenuItem key={x} value={x}>
                                        {x}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TimePicker className="light-alarm-component" initialTime={time} setTime={updateTime} />
                        </div>
                        <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
                        <Divider />
                        <div className="tasks-button-group text">
                            <div className="task-button-container" onClick={clickDelete}>
                                <Delete className="task-delete" />
                                <p className="task-delete">Delete</p>
                            </div>
                            <div className="task-button-container" onClick={saveTask}>
                                <Save className="task-save" />
                                <p className="task-save">Update</p>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}