import React, { useEffect, useState } from 'react';
import { LocalizationProvider, TimePicker as MuiTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './TimePicker.scss';


export default function TimePicker(props) {
    const [dateValue, setDateValue] = useState(new Date());

    useEffect(() => {
        if (props.initialTime !== undefined) {
            const date = new Date();
            const initialDate = props.initialTime.split(":");
            date.setHours(initialDate[0]);
            date.setMinutes(initialDate[1]);
            setDateValue(date);
        }
    }, []);

    const handleDateChange = (date) => {
        if (!date) {
            return;
        }
        setDateValue(date);
        props.setTime(date.toLocaleTimeString('it-IT', {hour12: false}));
    }

    return (
        <>
            <div className="light-alarm-component">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MuiTimePicker
                        label={props.label}
                        value={dateValue || null}
                        onChange={handleDateChange}
                        format="hh:mm aa"
                        slotProps={{
                            textField: {
                                margin: 'normal',
                                fullWidth: true
                            }
                        }}
                    />
                </LocalizationProvider>
            </div>
        </>
    )

}