import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import {FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';

export default function CreateLightActivity(props) {
    const [state, ] = useContext(Context);
    const [edited, setEdited] = useState(false);

    return (
        <>
            <div className="settings-row">
                <FormControl className="light-alarm-component task-room-picker-row" variant="outlined">
                    <InputLabel id="light-group-dropdown">Room</InputLabel>
                    <Select
                        data-testid="alarm-room-picker"
                        id="settings-light-rooms"
                        value={props.selectedRoom}
                        onChange={props.updateSelectedRoom}
                        label="Room"
                    >
                        <MenuItem key="all-rooms" value="All Rooms">All Rooms</MenuItem>
                        {state.userLightGroups.map((group) => (
                            <MenuItem key={group.groupId} value={group.groupName}>
                                {group.groupName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TimePicker className="light-alarm-component" initialTime={props.time} setTime={props.updateTime} />
            </div>
            <WeekPicker daysOfWeek={props.daysOfWeek} toggleDay={props.toggleDay} setEdited={() => setEdited(true)} />
        </>
    )
}