import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary,  FormControl, MenuItem, Select, InputLabel, Divider } from '@material-ui/core';


export default function LightAlarmEditPanel(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [state,] = useContext(Context);
    const [days, setDays] = useState();
    const [groupId, setGroupId] = useState();
    const [opened, setOpened] = useState(true);
    const [edited, setEdited] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, -3));


    const updateTime = (dateTime) => {
        setEdited(true);
        setTime(dateTime);
    }

    const updateSelectedRoom = (item) => {
        setEdited(true);
        setGroupId(state.userLightGroups.find(x => x.groupName === item.target.value).groupId);
        setSelectedRoom(item.target.value)
    }

    const toggleDay = (task, newState) => {
        const newProjects = daysOfWeek.map(day => day.id === task.id
            ? { ...day, on: newState }
            : day
        );
        setDaysOfWeek(newProjects);
        setDays(newProjects.filter(x => x.on === true).map(y => y.id).join(''));
    }

    const save = () => {
        const task = {alarmGroupName: selectedRoom, alarmLightGroup: groupId, alarmTime: time, alarmDays: days};
        props.saveNewTask(task);
    }

    return (
        <>
            <ExpansionPanel className="task-panel" defaultExpanded={opened}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => { setOpened(!opened) }}>
                <div>
                        <div className="alarm-setting-group" data-testid="light-alarm-group">
                            {
                                !opened &&
                                <div className="settings-row alarm-row">
                                    <p className="settings-text alarm-time">{time.slice(0, -3)}</p>
                                </div>
                            }
                            <div className="settings-row alarm-row">
                                <p className="settings-text alarm-group-name">{selectedRoom}</p>
                            </div>
                        </div>
                        {
                            !opened &&
                            <div className="settings-row alarm-row">
                                <p className="settings-text measure-unit">{days}</p>
                            </div>
                        }
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="center">
                    <div className="settings-row">
                        <FormControl className="light-alarm-component settings-first-item" variant="outlined">
                            <InputLabel id="light-group-dropdown">Room</InputLabel>
                            <Select
                                data-testid="alarm-room-picker"
                                id="settings-light-rooms"
                                value={selectedRoom}
                                onChange={updateSelectedRoom}
                                label="Room"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {state.userLightGroups.map((group) => (
                                    <MenuItem key={group.groupId} value={group.groupName}>
                                        {group.groupName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TimePicker className="light-alarm-component" initialTime={props.time} setTime={updateTime} />
                    </div>
                    <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
                    <Divider />
                        <div className="tasks-button-group">
                            <button className="save-button" data-testid="save-task-button" disabled={!edited} onClick={save}>Save</button>
                        </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}