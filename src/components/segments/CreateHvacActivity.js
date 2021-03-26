import React, { useState } from 'react';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import { FormControl } from '@material-ui/core';
import TempPicker from '../controls/TempPicker';


export default function CreateHvacActivity(props) {
    const [edited, setEdited] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="settings-row">
                <FormControl className="light-alarm-component" variant="outlined">

                </FormControl>
            </div>
            <div className="settings-row">
                <TimePicker className="light-alarm-component" initialTime={props.startTime} setTime={props.updateStartTime} label="start time"/>
                <TimePicker className="light-alarm-component" initialTime={props.stopTime} setTime={props.updateStopTime} label="stop time"/>
            </div>
            <div className="settings-row">
                <TempPicker open={open} toggle={() => setOpen(!open)}/>
                <button onClick={() => setOpen(!open)}>Toggle</button>
            </div>
            <WeekPicker daysOfWeek={props.daysOfWeek} toggleDay={props.toggleDay} setEdited={() => setEdited(true)} />
        </>
    )
}