import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import Knob from '../controls/Knob';
import './TempPicker.css'
import { AcUnitOutlined } from '@material-ui/icons';


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
            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal temp-picker-gap">
                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled" data-shrink="true">{props.label}</label>
                <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedEnd">
                    <input aria-invalid="false" className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd" value={props.value} onChange={() => { }} />
                    <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                        <button className="MuiButtonBase-root MuiIconButton-root" tabIndex="0" type="button" aria-label="change time" onClick={() => setOpen(!open)}>
                            <span className="MuiIconButton-label">
                                <AcUnitOutlined/>
                            </span>
                            <span className="MuiTouchRipple-root"></span>
                        </button>
                    </div>
                </div>
            </div>

            <Dialog open={open}>
            <div className="MyuiDialogContent-root MyuiPickersModal-dialog">
                <div className="MyuiPickersBasePicker-container">
                    <div className="MyuiToolbar-root MyuiToolbar-regular MyuiPickersToolbar-toolbar MyuiToolbar-gutters">
                        <div className="MyuiPickersTimePickerToolbar-hourMinuteLabel">
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
            <div className="MyuiDialogActions-root MyuiDialogActions-spacing">
                <button className="MyuiButtonBase-root MyuiButton-root MyuiButton-text MyuiButton-textPrimary" type="button" onClick={() => setOpen(false)}>
                    <span class="MyuiButton-label">Cancel</span>
                    <span class="MyuiTouchRipple-root"></span>
                </button>
                <button className="MyuiButtonBase-root MyuiButton-root MyuiButton-text MyuiButton-textPrimary" type="button" onClick={knobChange}>
                    <span class="MyuiButton-label">OK</span>
                    <span class="MyuiTouchRipple-root"></span>
                </button>
            </div>
        </Dialog>
        </>
    )
}

