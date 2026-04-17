import React, { useContext } from 'react';
import { Context } from '../../state/Store';
import { Divider } from '@mui/material';
import { GreenButton } from '../../components/controls/Buttons';


export default function SettingsPanel(props) {
    const [state,] = useContext(Context)

    const handleClick = () => {
        props.toggleEdit();
    }

    return (
        <>
            <div className="settings-group setting panel-header-text">
                <h2>Garage</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting">Preferred Garage:</p>
                <p className="setting">{state.preferences.garageName ? state.preferences.garageName : "--"}</p>
            </div>
            <div className="settings-group setting panel-header-text">
                <h2>Temperature</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting">Unit:</p>
                <p className="setting">{state.preferences.tempUnit}</p>
            </div>
            <div className="settings-row text">
                <p className="setting">City:</p>
                <p className="setting">{state.preferences.city}</p>
            </div>
            <div className="setting text panel-header-text">
                <h2>Measurement</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting">Unit:</p>
                <p className="setting">{state.preferences.measureUnit}</p>
            </div>
            <div>
                <GreenButton onClick={handleClick}>Edit</GreenButton>
            </div>
        </>
    );
}