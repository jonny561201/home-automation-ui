import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import useSound from 'use-sound';
import clickSound from '../../resources/click.mp3';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import { FormControl, Divider } from '@material-ui/core';
import TempPicker from '../controls/TempPicker';
import { Save, Delete } from '@material-ui/icons';


export default function CreateHvacActivity(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [state, dispatch] = useContext(Context);
    const [edited, setEdited] = useState(false);
    const [open, setOpen] = useState(false);
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [days, setDays] = useState();
    const [groupId, setGroupId] = useState();
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [startTime, setStartTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));
    const [stopTime, setStopTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));

    const saveActivity = async () => {
        if (edited && days !== null) {
            // const tasks = await insertScheduledTasks(getStore().getUserId(), groupId, selectedRoom, days, time, true, type);
            // dispatch({ type: 'SET_SCHEDULED_TASK', payload: tasks });
            props.saveNewTask();
            click();
        }
    }

    const updateStopTime = (dateTime) => {
        setEdited(true);
        setStopTime(dateTime);
    }

    const updateStartTime = (dateTime) => {
        setEdited(true);
        setStartTime(dateTime);
    }

    const deleteActivity = () => {
        props.cancel();
        click();
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
        <>
            <div className="settings-row">
                <FormControl className="light-alarm-component" variant="outlined">

                </FormControl>
            </div>
            <div className="settings-row">
                <TimePicker className="light-alarm-component" initialTime={startTime} setTime={updateStartTime} label="start time" />
                <TimePicker className="light-alarm-component" initialTime={stopTime} setTime={updateStopTime} label="stop time" />
            </div>
            <div className="settings-row">
                <TempPicker open={open} toggle={() => setOpen(!open)} />
                <button onClick={() => setOpen(!open)}>Toggle</button>
            </div>
            <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
            <Divider />
            <div className="tasks-button-group text">
                <div className="task-button-container" onClick={deleteActivity}>
                    <Delete className="task-button task-delete" />
                    <p className="task-delete">Cancel</p>
                </div>
                <div className="task-button-container" onClick={saveActivity}>
                    <Save className={`task-button ${edited ? "edited" : ""}`} />
                    <p className={edited ? "edited" : ""}>Save</p>
                </div>
            </div>
        </>
    )
}