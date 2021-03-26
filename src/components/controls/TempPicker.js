import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import Knob from '../controls/Knob';
import './TempPicker.css'


export default function TempPicker(props) {
    const minThermostatTemp = 50;
    const maxThermostatTemp = 90;
    const [desiredTemp, setDesiredTemp] = useState(72);
    const [displayColor, setDisplayColor] = useState("#A0A0A0");

    const knobChange = (newValue) => {
        setDesiredTemp(newValue);
        // debounchApi(() => setUserTemperature(getStore().getUserId(), newValue, mode, isFahrenheit));
    }

    return (
        <Dialog open={props.open}>
            <div className="MuiDialogContent-root MuiPickersModal-dialog">
                <div className="MuiPickersBasePicker-container">
                    <div className="MuiToolbar-root MuiToolbar-regular MuiPickersToolbar-toolbar MuiToolbar-gutters">
                        <div className="MuiPickersTimePickerToolbar-hourMinuteLabel">
                            <h2 className="header-text">Temperature</h2>
                        </div>
                    </div>
                    <div className="MuiPickersBasePicker-pickerView">
                        <div className="MuiPickersClock-container">
                            <Knob value={desiredTemp} lineCap={"round"} fgColor={displayColor} inputColor={displayColor} onChange={knobChange} angleArc={240} angleOffset={240} min={minThermostatTemp} max={maxThermostatTemp} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="MuiDialogActions-root MuiDialogActions-spacing">
                <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary" type="button" onClick={props.toggle}>
                    <span class="MuiButton-label">Cancel</span>
                    <span class="MuiTouchRipple-root"></span>
                </button>
                <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary" type="button" onClick={props.toggle}>
                    <span class="MuiButton-label">OK</span>
                    <span class="MuiTouchRipple-root"></span>
                </button>
            </div>
        </Dialog>
    )
}