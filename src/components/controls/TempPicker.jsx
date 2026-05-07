import React, { useState } from 'react';
import { Button, Dialog, TextField, InputAdornment, IconButton } from '@mui/material';
import Knob from '../controls/Knob';
import './TempPicker.scss'
import { AcUnitOutlined } from '@mui/icons-material';


export default function TempPicker(props) {
    const displayColor = "#00c774";
    const minThermostatTemp = 50;
    const maxThermostatTemp = 90;
    const [open, setOpen] = useState(false);
    const [desiredTemp, setDesiredTemp] = useState(72);

    const knobChange = () => {
        props.onChange(desiredTemp);
        setOpen(false)
    }

    return (
        <>
            <div className="light-alarm-component">
            <TextField fullWidth label={props.label} value={props.value} variant="outlined" margin="normal"
                slotProps={{
                    input: {
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="change temperature" onClick={() => setOpen(!open)} size="small">
                                    <AcUnitOutlined fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
            </div>

            <Dialog open={open}>
            <div className="MyuiPickersModal-dialog">
                <div>
                    <div className="MyuiToolbar-regular MyuiPickersToolbar-toolbar">
                        <div>
                            <h2 className="header-text">Temperature</h2>
                        </div>
                    </div>
                    <div className="MyuiPickersBasePicker-pickerView">
                        <div className="MyuiPickersClock-container">
                            <Knob value={desiredTemp} lineCap={"round"} fgColor={displayColor} inputColor={displayColor} onChange={setDesiredTemp} angleArc={240} angleOffset={240} min={minThermostatTemp} max={maxThermostatTemp} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="MyuiDialogActions-root">
                <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="text" onClick={knobChange}>OK</Button>
            </div>
        </Dialog>
        </>
    )
}
