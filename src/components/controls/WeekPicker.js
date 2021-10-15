import React, { useEffect, useState } from 'react';
import DayPicker from './DayPicker';
import './WeekPicker.css'


export default function WeekPicker(props) {
    const [days, setDays] = useState([]);

    useEffect(() => {
        setDays(props.daysOfWeek)
    })

    return (
        <div className="weekday-picker">
            {days.map((weekday) => (
                <DayPicker key={weekday.id + "-day-picker"} day={weekday} toggleDay={props.toggleDay} setEdited={props.setEdited} />
            ))}
        </div>
    )
}