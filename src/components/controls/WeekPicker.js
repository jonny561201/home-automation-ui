import React, { useContext } from 'react';
import DayPicker from './DayPicker';
import { Context } from '../../state/Store';
import './WeekPicker.css'


export default function WeekPicker(props) {
    const [state, ] = useContext(Context);

    return (
        <div className="weekday-picker">
            {state.daysOfWeek.map((weekday) => (
                <DayPicker key={weekday.id + "-day-picker"} day={weekday} setEdited={props.setEdited} />
            ))}
        </div>
    )
}