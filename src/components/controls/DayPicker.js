import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import './DayPicker.css';


export default function DayPicker(props) {
    const [on, setOn] = useState(props.day.on);
    const [ ,dispatch] = useContext(Context);

    const toggleDay = () => {
        const updatedState = !on;
        dispatch({type: 'TOGGLE_DAY_OF_WEEK', payload: {...props.day, on: updatedState} });
        setOn(updatedState);
    }

    return (
        <button className={on ? "day-picker selected" : "day-picker"} onClick={toggleDay}>
            {props.day.day}
        </button>
    )
}