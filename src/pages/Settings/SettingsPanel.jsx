import React, { useContext } from 'react';
import { Context } from '../../state/Store';
import { selectPreferredGarage } from '../../state/selectors';
import { Divider } from '@mui/material';
import { GreenButton } from '../../components/controls/Buttons';


export default function SettingsPanel(props) {
    const [state,] = useContext(Context);
    const preferences = state.preferences || {};
    const selectedGarage = selectPreferredGarage(state);

    const handleClick = () => {
        props.toggleEdit();
    }

    const formatCity = () => {
        if (preferences.city && preferences.state) return preferences.city + ', ' + preferences.state;
        if (preferences.city) return preferences.city;
        return '--';
    }

    const formatCoords = () => {
        if (preferences.latitude && preferences.longitude) {
            return preferences.latitude.toFixed(5) + ', ' + preferences.longitude.toFixed(5);
        }
        return '--';
    }

    return (
        <>
            <div className="settings-group setting panel-header-text">
                <h2>Garage</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting">Preferred Garage:</p>
                <p className="setting">{selectedGarage ? selectedGarage.doorName : "--"}</p>
            </div>
            <div className="settings-row text">
                <p className="setting">Auto-Close Timer:</p>
                <p className="setting">{preferences.garageAlertTime ? preferences.garageAlertTime + " min" : "Disabled"}</p>
            </div>
            <div className="settings-group setting panel-header-text">
                <h2>Temperature</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting">Unit:</p>
                <p className="setting">{preferences.tempUnit || '--'}</p>
            </div>
            <div className="settings-row text">
                <p className="setting">City:</p>
                <p className="setting">{formatCity()}</p>
            </div>
            <div className="settings-row text">
                <p className="setting">Coordinates:</p>
                <p className="setting">{formatCoords()}</p>
            </div>
            <div className="setting text panel-header-text">
                <h2>Measurement</h2>
            </div>
            <Divider />
            <div className="settings-row text">
                <p className="setting">Unit:</p>
                <p className="setting">{preferences.measureUnit || '--'}</p>
            </div>
            <div>
                <GreenButton onClick={handleClick}>Edit</GreenButton>
            </div>
        </>
    );
}