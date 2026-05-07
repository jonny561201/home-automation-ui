import React, { useState } from 'react';
import { Button } from '@mui/material';
import './DayPicker.scss';


export default function DayPicker(props) {
    const [on, setOn] = useState(props.day.on);

    const toggleDay = () => {
        const updatedState = !on;
        props.toggleDay(props.day, updatedState);
        setOn(updatedState);
        props.setEdited();
    }

    return (
        <Button disableElevation variant="contained" className={on ? "day-picker selected" : "day-picker"} onClick={toggleDay}>
            {props.day.day}
        </Button>
    )
}