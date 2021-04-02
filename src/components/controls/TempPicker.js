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
            <div className="MyuiDialogContent-root MyuiPickersModal-dialog">
                <div className="MyuiPickersBasePicker-container">
                    <div className="MyuiToolbar-root MyuiToolbar-regular MyuiPickersToolbar-toolbar MyuiToolbar-gutters">
                        <div className="MyuiPickersTimePickerToolbar-hourMinuteLabel">
                            <h2 className="header-text">Temperature</h2>
                        </div>
                    </div>
                    <div className="MyuiPickersBasePicker-pickerView">
                        <div className="MyuiPickersClock-container">
                            <Knob value={desiredTemp} lineCap={"round"} fgColor={displayColor} inputColor={displayColor} onChange={knobChange} angleArc={240} angleOffset={240} min={minThermostatTemp} max={maxThermostatTemp} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="MyuiDialogActions-root MyuiDialogActions-spacing">
                <button className="MyuiButtonBase-root MyuiButton-root MyuiButton-text MyuiButton-textPrimary" type="button" onClick={props.toggle}>
                    <span class="MyuiButton-label">Cancel</span>
                    <span class="MyuiTouchRipple-root"></span>
                </button>
                <button className="MyuiButtonBase-root MyuiButton-root MyuiButton-text MyuiButton-textPrimary" type="button" onClick={props.toggle}>
                    <span class="MyuiButton-label">OK</span>
                    <span class="MyuiTouchRipple-root"></span>
                </button>
            </div>
        </Dialog>
    )
}