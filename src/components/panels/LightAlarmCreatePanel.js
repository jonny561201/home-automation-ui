import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../state/Store';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import { FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';


export default function LightAlarmEditPanel(props) {
    const [state,] = useContext(Context);
    const [time, setTime] = useState();
    const [edited, setEdited] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();

    useEffect(() => {
        if (state.userLightGroups.filter(x => x.groupName === props.groupName).length > 0)
            setSelectedRoom(props.groupName);
    }, []);


    const updateTime = (dateTime) => {
        setEdited(true);
        setTime(dateTime);
    }

    const updateSelectedRoom = (item) => {
        setEdited(true);
        setSelectedRoom(item.target.value)
    }

    return (
        <>
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
        <WeekPicker daysOfWeek={state.daysOfWeek} setEdited={() => setEdited(true)} />
    </>
    )
}