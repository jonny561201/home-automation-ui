import React from 'react';

export default function LightAlarm(props) {

    return (
        <>
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