import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import useSound from 'use-sound';
import clickSound from '../../resources/click.mp3';
import TimePicker from '../../components/controls/TimePicker';
import WeekPicker from '../../components/controls/WeekPicker';
import TempPicker from '../../components/controls/TempPicker';
import { Save, Delete } from '@material-ui/icons';
import { Divider, Button } from '@material-ui/core';
import { insertHvacTask } from '../../utilities/RestApi';
import './CreateHvacActivity.css';


export default function CreateHvacActivity(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [state, dispatch] = useContext(Context);
    const [days, setDays] = useState();
    const [inTemp, setInTemp] = useState(72);
    const [outTemp, setOutTemp] = useState(72);
    const [edited, setEdited] = useState(false);
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [startTime, setStartTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));
    const [stopTime, setStopTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));

    const saveActivity = async () => {
        if (edited && days !== null) {
            const tasks = await insertHvacTask(state.user.userId, state.auth.bearer, true, props.type, '', startTime, stopTime, inTemp, outTemp, days);
            dispatch({ type: 'SET_SCHEDULED_TASK', payload: tasks });
            props.save();
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
                <div className="task-button-container">
                    <Button className="task-delete" onClick={deleteActivity} startIcon={<Delete/>}>Cancel</Button>
                </div>
                <div className="task-button-container">
                    <Button className={`${edited ? "edited" : ""}`} onClick={saveActivity} startIcon={<Save/>}>Save</Button>
                </div>
            </div>
        </>
    )
}