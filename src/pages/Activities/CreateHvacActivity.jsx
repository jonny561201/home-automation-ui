import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import TimePicker from '../../components/controls/TimePicker';
import WeekPicker from '../../components/controls/WeekPicker';
import TempPicker from '../../components/controls/TempPicker';
import { Save, Delete } from '@mui/icons-material';
import { Divider, Button } from '@mui/material';
import { insertHvacTask } from '../../utilities/RestApi';
import './CreateHvacActivity.scss';


export default function CreateHvacActivity(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [_, dispatch] = useContext(Context);
    const [days, setDays] = useState();
    const [inTemp, setInTemp] = useState(72);
    const [outTemp, setOutTemp] = useState(72);
    const [edited, setEdited] = useState(false);
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [startTime, setStartTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));
    const [stopTime, setStopTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));

    const saveActivity = async () => {
        if (edited && days !== null) {
            const response = await insertHvacTask(true, props.type, '', startTime, stopTime, inTemp, outTemp, days);
            dispatch({ type: 'SET_SCHEDULED_TASK', payload: response.tasks || [] });
            props.save();
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
            <div className="picker-row">
                <TimePicker initialTime={startTime} setTime={updateStartTime} label="start time" />
                <TimePicker initialTime={stopTime} setTime={updateStopTime} label="stop time" />
            </div>
            <div className="picker-row">
                <TempPicker value={inTemp} onChange={setInTemp} label="Start Temp" />
                <TempPicker value={outTemp} onChange={setOutTemp} label="Stop Temp" />
            </div>
            <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
            <Divider />
            <div className="tasks-button-group text">
                <div className="task-button-container">
                    <Button className="task-delete" onClick={deleteActivity} startIcon={<Delete/>}>Cancel</Button>
                </div>
                <div className="task-button-container">
                    <Button className="task-save" onClick={saveActivity} startIcon={<Save/>}>Save</Button>
                </div>
            </div>
        </>
    )
}