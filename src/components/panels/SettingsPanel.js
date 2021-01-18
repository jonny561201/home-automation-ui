import React, { useContext } from 'react';
import { Context } from '../../state/Store';
import { Divider } from '@material-ui/core';
import LightAlarm from '../panels/LightAlarmPanel';


export default function SettingsPanel(props) {
    const [state, ] = useContext(Context);

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
            {
                state.roles.some(x => x.role_name === 'lighting') &&
                // <LightAlarm />
                <></>
            }

            <button onClick={props.toggleEdit}>Edit</button>
        </div>
    );
}