import React, { useContext } from 'react';
import useSound from 'use-sound';
import { Context } from '../../state/Store';
import clickSound from '../../resources/click.mp3';
import { Divider } from '@material-ui/core';


export default function SettingsPanel(props) {
    const [state,] = useContext(Context)
    const [click] = useSound(clickSound, { volume: 0.25 });

    const handleClick = () => {
        props.toggleEdit();
        click();
    }

    return (
        <>
            <div className="settings-group setting panel-header-text">
                <h2>Garage</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting measure-unit">Open Door:</p>
            </div>
            <div className="settings-group setting panel-header-text">
                <h2>Temperature</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting temp-unit">Unit:</p>
                <p className="setting temp-unit">{state.preferences.temp_unit}</p>
            </div>
            <div className="settings-row text">
                <p className="setting temp-city">City:</p>
                <p className="setting temp-city">{state.preferences.city}</p>
            </div>
            <div className="setting text panel-header-text">
                <h2>Measurement</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting measure-unit">Unit:</p>
                <p className="setting measure-unit">{state.preferences.measure_unit}</p>
            </div>
            <div>
                <button onClick={handleClick} className="success-ripple">Edit</button>
            </div>
        </>
    );
}