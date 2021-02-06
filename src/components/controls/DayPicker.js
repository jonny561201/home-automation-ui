import React, { useState } from 'react';
import useSound from 'use-sound';
import PopSound from '../../resources/pop.mp3';
import './DayPicker.css';


export default function DayPicker(props) {
    const [pop] = useSound(PopSound);
    const [on, setOn] = useState(props.day.on);

    const toggleDay = () => {
        const updatedState = !on;
        props.toggleDay(props.day, updatedState);
        setOn(updatedState);
        props.setEdited();
        pop();
    }

    return (
        <button className={on ? "day-picker selected" : "day-picker"} onClick={toggleDay}>
            {props.day.day}
        </button>
    )
}