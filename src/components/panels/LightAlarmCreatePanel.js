import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import { getStore } from '../../state/GlobalState';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import { Save, Delete } from '@material-ui/icons';
import { insertScheduledTasks } from '../../utilities/RestApi';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, FormControl, MenuItem, Select, InputLabel, Divider } from '@material-ui/core';


export default function LightAlarmEditPanel(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [state, dispatch] = useContext(Context);
    const [days, setDays] = useState();
    const [type, setType] = useState('');
    const [groupId, setGroupId] = useState();
    const [opened, setOpened] = useState(true);
    const [edited, setEdited] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [time, setTime] = useState(new Date().toLocaleTimeString('it-IT', { hour12: false }));


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

    const save = async () => {
        if (edited && selectedRoom !== '' && days !== null) {
            const tasks = await insertScheduledTasks(getStore().getUserId(), groupId, selectedRoom, days, time, true, type);
            dispatch({ type: 'SET_SCHEDULED_TASK', payload: tasks });
            props.saveNewTask();
        }
    }
    
    const updateSelectedType = (item) => {
        setEdited(true);
        setType(state.taskTypes.find(x => x === item.target.value));
    }

    return (
        <>
            <ExpansionPanel className="task-panel" defaultExpanded={opened} expanded={opened} onChange={() => { setOpened(!opened) }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                    <FormControl className="task-room-picker-row" variant="outlined">
                        <InputLabel id="light-group-dropdown">Room</InputLabel>
                        <Select
                            data-testid="alarm-room-picker"
                            id="settings-light-rooms"
                            value={selectedRoom}
                            onChange={updateSelectedRoom}
                            label="Room"
                        >
                            {state.userLightGroups.map((group) => (
                                <MenuItem key={group.groupId} value={group.groupName}>
                                    {group.groupName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="settings-row">
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
                    <div className="tasks-button-group">
                        <div className="task-button-container" onClick={props.cancelNewTask}>
                            <Delete className="task-button task-delete" />
                            <p className="task-delete">Cancel</p>
                        </div>
                        <div className="task-button-container" onClick={save}>
                            <Save className={`task-button ${edited ? "edited" : ""}`} />
                            <p className={edited ? "edited" : ""}>Save</p>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}