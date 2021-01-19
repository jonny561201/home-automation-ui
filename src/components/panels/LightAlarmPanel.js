import React, { useState } from 'react';
import WeekPicker from '../controls/WeekPicker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimePicker from '../controls/TimePicker';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Divider } from '@material-ui/core';


export default function LightAlarm(props) {
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [time, setTime] = useState(props.lightTime);
    const [daysOfWeek, setDaysOfWeek] = useState([{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }]);

    const updateTime = (dateTime) => {
        setEdited(true);
        setTime(dateTime);
    }

    const saveTask = () => {
        console.log(JSON.stringify(daysOfWeek))
    }

    const toggleDay = (task, newState) => {
        const newProjects = daysOfWeek.map(day =>
            day.id === task.id
              ? { ...day, on: newState }
              : day
          );
        setDaysOfWeek(newProjects);
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
                                <p className="settings-text alarm-group-name">{props.groupName}</p>
                            </div>
                        </div>
                        {
                            !open &&
                            <div className="settings-row alarm-row">
                                <p className="settings-text measure-unit">{props.lightDays}</p>
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
                            <button className="cancel" onClick={() => {}}>Delete</button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}