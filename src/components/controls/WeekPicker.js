import React from 'react';
import DayPicker from './DayPicker';
import './WeekPicker.css'


export default function WeekPicker(props) {

    return (
        <div className="weekday-picker">
            {props.daysOfWeek.map((weekday) => (
                <DayPicker key={weekday.id + "-day-picker"} day={weekday} toggleDay={props.toggleDay} setEdited={props.setEdited} />
            ))}
        </div>
    )
}