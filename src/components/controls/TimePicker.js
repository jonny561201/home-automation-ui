import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import './TimePicker.css';


export default function TimePicker() {
    const [dateValue, setDateValue] = useState();

    const handleDateChange = (date) => {
        setDateValue(date);
    }

    return (
        <>
            <div className="light-alarm-time-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
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