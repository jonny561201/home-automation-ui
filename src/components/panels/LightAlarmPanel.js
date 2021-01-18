import React from 'react';
import { Divider } from '@material-ui/core';

export default function LightAlarm(props) {

    return (
        <>
            <div className="settings-group settings-text">
                <h2>Light Alarm</h2>
            </div>
            <Divider />
            <div className="settings-row">
                <p className="settings-text measure-unit">Alarm Room:</p>
                <p className="settings-text measure-unit">{props.groupName}</p>
            </div>
            <div className="settings-row">
                <p className="settings-text measure-unit">Alarm Days:</p>
                <p className="settings-text measure-unit">{props.lightDays}</p>
            </div>
            <div className="settings-row">
                <p className="settings-text measure-unit">Alarm Time:</p>
                <p className="settings-text measure-unit">{props.lightTime}</p>
            </div>
        </>
    )
}