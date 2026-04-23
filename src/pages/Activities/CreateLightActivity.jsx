import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import TimePicker from '../../components/controls/TimePicker';
import WeekPicker from '../../components/controls/WeekPicker';
import { Save, Delete } from '@mui/icons-material';
import { insertLightTask } from '../../utilities/RestApi';
import { MenuItem, TextField, Divider, Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import './CreateLightActivity.scss';


export default function CreateLightActivity(props) {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [edited, setEdited] = useState(false);
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [days, setDays] = useState();
    const [groupId, setGroupId] = useState();
    const [selectedRoom, setSelectedRoom] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [time, setTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));


    const saveActivity = async () => {
        if (edited && selectedRoom !== '' && days !== null) {
            const token = await auth0.getAccessTokenSilently();
            const response = await insertLightTask(token, true, props.type, groupId, selectedRoom, days, time);
            dispatch({ type: 'SET_SCHEDULED_TASK', payload: response.tasks || [] });
            props.save();
        }
    }

    const updateSelectedRoom = (item) => {
        setEdited(true);
        item.target.value === "All Rooms"
            ? setGroupId("0")
            : setGroupId(state.lights.find(x => x.groupName === item.target.value).groupId)
        setSelectedRoom(item.target.value);
    }

    const updateTime = (dateTime) => {
        setEdited(true);
        setTime(dateTime);
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
            <div className="create-light-activity-row">
                <TextField className="light-alarm-component" select variant="outlined" value={selectedRoom} onChange={updateSelectedRoom} label="Room">
                    <MenuItem key="all-rooms" value="All Rooms">All Rooms</MenuItem>
                    {state.lights.map((group) => (
                        <MenuItem key={group.groupId} value={group.groupName}>
                            {group.groupName}
                        </MenuItem>
                    ))}
                </TextField>
                <TimePicker className="light-alarm-component" initialTime={time} setTime={updateTime} />
            </div>
            <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
            <Divider />
            <div className="tasks-button-group text">
                <div className="task-button-container" onClick={deleteActivity}>
                    <Button className="task-delete" onClick={deleteActivity} startIcon={<Delete/>}>Cancel</Button>
                </div>
                <div className="task-button-container">
                    <Button className="task-save" onClick={saveActivity} startIcon={<Save/>}>Save</Button>
                </div>
            </div>
        </>
    )
}