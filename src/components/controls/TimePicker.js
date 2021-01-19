import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import './TimePicker.css';


export default function TimePicker(props) {
    const [dateValue, setDateValue] = useState();

    useEffect(() => {
        if (props.initialTime != undefined) {
            const date = new Date();
            const initialDate = props.initialTime.split(":");
            date.setHours(initialDate[0]);
            date.setMinutes(initialDate[1]);
            setDateValue(date);
        }
    }, []);

    const handleDateChange = (date) => {
        setDateValue(date);
        props.setTime(date.toLocaleTimeString('it-IT'));
    }

    return (
        <>
            <div data-testid="time-picker" className="light-alarm-component">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        label="Time picker"
                        value={dateValue}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </>
    )

}