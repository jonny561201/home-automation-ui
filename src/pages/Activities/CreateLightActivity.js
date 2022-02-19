import React, { useContext, useState } from 'react';
import useSound from 'use-sound';
import clickSound from '../../resources/click.mp3';
import { Context } from '../../state/Store';
import TimePicker from '../../components/controls/TimePicker';
import WeekPicker from '../../components/controls/WeekPicker';
import { Save, Delete } from '@material-ui/icons';
import { insertLightTask } from '../../utilities/RestApi';
import { MenuItem, TextField, Divider } from '@material-ui/core';


export default function CreateLightActivity(props) {
    const [state, dispatch] = useContext(Context);
    const [edited, setEdited] = useState(false);
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [days, setDays] = useState();
    const [groupId, setGroupId] = useState();
    const [selectedRoom, setSelectedRoom] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [time, setTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));


    const saveActivity = async () => {
        if (edited && selectedRoom !== '' && days !== null) {
            const tasks = await insertLightTask(state.user.userId, state.auth.bearer, true, props.type, groupId, selectedRoom, days, time);
            dispatch({ type: 'SET_SCHEDULED_TASK', payload: tasks });
            props.save();
            click();
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
                <TextField className="light-alarm-component task-room-picker-row" select variant="outlined" value={selectedRoom} onChange={updateSelectedRoom} label="Room" data-testid="alarm-room-picker">
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