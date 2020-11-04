import React, { useContext } from 'react';
import DayPicker from './DayPicker';
import { Context } from '../../state/Store';
import './WeekPicker.css'


export default function WeekPicker() {
    const [state, dispatch] = useContext(Context);
    // const daysOfWeek = [{ day: 'S', on: false }, { day: 'M', on: false }, { day: 'T', on: false },
    //                     { day: 'W', on: false }, { day: 'T', on: false }, { day: 'F', on: false }, { day: 'S', on: false }];

    // const toggleWeekday = (day) => {
    //     day.on = !day.on;
    //     console.log(`Day ${day.day} on: ${day.on}`)
    // }

    return (
        <div className="weekday-picker">
            {state.daysOfWeek.map((weekday) => (
                <DayPicker day={weekday} />
            ))}
        </div>
    )
}