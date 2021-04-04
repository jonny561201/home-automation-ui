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
            <div className="settings-wrapper body">
                <div className="settings-group setting panel-header-text">
                    <h2>Temperature</h2>
                </div>
                <Divider />
                <div className="settings-row text">
                    <p className="setting temp-unit">Unit:</p>
                    <p className="setting temp-unit">{props.tempUnit}</p>
                </div>
                <div className="settings-row text">
                    <p className="setting temp-city">City:</p>
                    <p className="setting temp-city">{props.city}</p>
                </div>
                <div className="setting text panel-header-text">
                    <h2>Measurement</h2>
                </div>
                <Divider />
                <div className="settings-row text">
                    <p className="setting measure-unit">Unit:</p>
                    <p className="setting measure-unit">{props.measureUnit}</p>
                </div>
            </div>
            <div>
                <button onClick={handleClick} className="success-ripple">Edit</button>
            </div>
        </>
    );
}