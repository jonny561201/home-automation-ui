import React, { useState } from 'react';
import WeekPicker from '../controls/WeekPicker';
import TimePicker from '../controls/TimePicker';
import { getStore } from '../../state/GlobalState';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deleteScheduledTask, updateScheduledTasks } from '../../utilities/RestApi';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Divider } from '@material-ui/core';


export default function LightAlarm(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [days, setDays] = useState(props.task.alarm_days);
    const [time, setTime] = useState(props.task.alarm_time);
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays.map(day => props.task.alarm_days.includes(day.id) ? { ...day, on: true } : day));

    const updateTime = (dateTime) => {
        setEdited(true);
        setTime(dateTime);
    }

    const saveTask = async () => {
        const task = props.task;
        await updateScheduledTasks(getStore().getUserId(), task.task_id, task.alarm_light_group, task.alarm_group_name, days, time);
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
        const response = await deleteScheduledTask(getStore().getUserId(), props.task.task_id);
        if (response.ok) {
            props.deleteTask(props.task.task_id);
        }
    }

    return (
        <>
            <ExpansionPanel className="task-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => { setOpen(!open) }}>
                    <div>
                        <div className="alarm-setting-group" data-testid="light-alarm-group">
                            {
                                !open &&
                                <div className="settings-row alarm-row">
                                    <p className="settings-text alarm-time">{time}</p>
                                </div>
                            }
                            <div className="settings-row alarm-row">
                                <p className="settings-text alarm-group-name">{props.task.alarm_group_name}</p>
                            </div>
                        </div>
                        {
                            !open &&
                            <div className="settings-row alarm-row">
                                <p className="settings-text measure-unit">{days}</p>
                            </div>
                        }
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="center">
                    <div>
                        <TimePicker className="light-alarm-component" initialTime={time} setTime={updateTime} />
                        <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
                        <Divider />
                        <div className="tasks-button-group">
                            <button className="submit" disabled={!edited} onClick={saveTask}>Update</button>
                            <button className="cancel" onClick={clickDelete}>Delete</button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}