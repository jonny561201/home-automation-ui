import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import { Save, Delete } from '@mui/icons-material';
import TempPicker from '../../components/controls/TempPicker';
import TimePicker from '../../components/controls/TimePicker';
import WeekPicker from '../../components/controls/WeekPicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { deleteScheduledTask, updateScheduledTasks } from '../../utilities/RestApi';
import { AccordionDetails, Accordion, AccordionSummary, Divider, Switch, Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";


export default function HvacActivity(props) {
    const auth0 = useAuth0();
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [_, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [type,] = useState(props.task.taskType);
    const [days, setDays] = useState(props.task.alarmDays);
    const [enabled, setEnabled] = useState(props.task.enabled);
    const [stopTime, setStopTime] = useState(props.task.hvacStop);
    const [startTime, setStartTime] = useState(props.task.hvacStart);
    const [inTemp, setInTemp] = useState(props.task.hvacStartTemp);
    const [outTemp, setOutTemp] = useState(props.task.hvacStopTemp);
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays.map(day => props.task.alarmDays.includes(day.id) ? { ...day, on: true } : day));

    const updateStopTime = (dateTime) => {
        setEdited(true);
        setStopTime(dateTime);
    }

    const updateStartTime = (dateTime) => {
        setEdited(true);
        setStartTime(dateTime);
    }

    const clickDelete = async () => {
        const token = await auth0.getAccessTokenSilently();
        const response = await deleteScheduledTask(token, props.task.taskId);
        if (response.ok)
            dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: props.task.taskId });
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
        const request = {
            'taskId': props.task.taskId, 'alarmLightGroup': props.task.alarmLightGroup, 'alarmGroupName': props.task.alarmGroupName,
            'alarmDays': days, 'hvacStart': startTime, 'hvacStop': stopTime, 'hvacStartTemp': inTemp, 'hvacStopTemp': outTemp, 'enabled': isEnabled, 'taskType': type
        };
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

    return (
        <Accordion expanded={open} onChange={() => { setOpen(!open) }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="alarm-summary-panel">
                    <div className="alarm-setting-group">
                        <p className="text activity-group-name">{props.task.taskType}</p>
                    </div>
                    <div className="alarm-setting-group">
                        <div className="alarm-column-one">
                            <p className="panel-header-text alarm-time">{`${startTime.slice(0, -3)} - ${stopTime.slice(0, -3)}`}</p>
                        </div>
                        <div className="alarm-column-two">
                            <Switch onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()}
                                checked={enabled} onChange={toggleTask} color="primary" slotProps={{ input: { 'aria-label': 'primary checkbox' } }} />
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
                    <div>
                        <div className="picker-row">
                            <TimePicker initialTime={startTime} setTime={updateStartTime} label="start time" />
                            <TimePicker initialTime={stopTime} setTime={updateStopTime} label="stop time" />
                        </div>
                    </div>
                    <div>
                        <div className="picker-row">
                            <TempPicker value={inTemp} onChange={(val) => { setEdited(true); setInTemp(val); }} label="Start Temp" />
                            <TempPicker value={outTemp} onChange={(val) => { setEdited(true); setOutTemp(val); }} label="Stop Temp" />
                        </div>
                    </div>
                    <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
                    <Divider />
                    <div className="tasks-button-group text">
                        <div className="task-button-container">
                            <Button className="task-delete" onClick={clickDelete} startIcon={<Delete/>}>Delete</Button>
                        </div>
                        <div className="task-button-container">
                            <Button className={edited ? "task-save" : "task-disabled"} disabled={!edited} onClick={saveTask} startIcon={<Save/>}>Update</Button>
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}