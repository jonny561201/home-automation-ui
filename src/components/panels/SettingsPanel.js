import React from 'react';
import useSound from 'use-sound';
import clickSound from '../../resources/click.mp3';
import { Divider } from '@material-ui/core';


export default function SettingsPanel(props) {
    const [click] = useSound(clickSound, {volume: 0.25});

    const handleClick = () => {
        props.toggleEdit();
        click();
    }

    return (
        <>
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
                <div className="settings-text settings-text">
                    <h2>Measurement</h2>
                </div>
                <Divider />
                <div className="settings-row">
                    <p className="settings-text measure-unit">Unit:</p>
                    <p className="settings-text measure-unit">{props.measureUnit}</p>
                </div>
            </div>
            <div>
                <button onClick={handleClick} className="success-ripple">Edit</button>
            </div>
        </>
    );
}