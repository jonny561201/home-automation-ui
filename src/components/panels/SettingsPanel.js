import React from 'react';
import { Divider } from '@material-ui/core';


export default function SettingsPanel(props) {
    return (
        <div className="settings-wrapper">
            <div className="settings-group settings-text">
                <h2>Temperature</h2>
            </div>
            <Divider />
            <div className="settings-row">
                <p className="settings-text temp-unit">Unit:</p>
                <p className="settings-text temp-unit">{props.tempUnit}</p>
            </div>
            <div className="settings-row">
                <p className="settings-text temp-city">City:</p>
                <p className="settings-text temp-city">{props.city}</p>
            </div>
            <div className="settings-wrapper settings-text">
                <h2>Measurement</h2>
            </div>
            <Divider />
            <div className="settings-row">
                <p className="settings-text measure-unit">Unit:</p>
                <p className="settings-text measure-unit">{props.measureUnit}</p>
            </div>
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
                <p className="settings-text measure-unit">{props.days}</p>
            </div>
            <div className="settings-row">
                <p className="settings-text measure-unit">Alarm Time:</p>
                <p className="settings-text measure-unit">{props.time}</p>
            </div>
            <button onClick={props.toggleEdit}>Edit</button>
        </div>
    );
}