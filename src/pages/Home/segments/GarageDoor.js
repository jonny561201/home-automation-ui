import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import { useInterval } from '../../../utilities/UseInterval';
import useSound from 'use-sound';
import dingSound from '../../../resources/ding.mp3';
import clickSound from '../../../resources/click.mp3';
import { ExpansionPanelDetails, ExpansionPanelActions } from '@material-ui/core';
import { toggleGarageDoor, updateGarageState } from '../../../utilities/RestApi';


export default function GarageDoor(props) {
    const [ding] = useSound(dingSound, { volume: 0.25 });
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [state, dispatch] = useContext(Context);
    const [statusDays, setStatusDays] = useState();
    const [statusMins, setStatusMins] = useState();
    const [statusHours, setStatusHours] = useState();

    useInterval(() => {
        updateGarageDuration();
    }, 1000);

    const updateGarageDuration = () => {
        const diffMs = new Date() - new Date(props.device.duration);
        setStatusDays(Math.floor(diffMs / 86400000));
        setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
        setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));
    };

    const openCloseGarageDoor = (newState) => {
        newState ? ding() : click();
        const response = updateGarageState(state.user.userId, state.auth.bearer, newState, props.device.doorId);
        dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { 'doorName': props.device.doorName, 'doorId': props.device.doorId, 'isOpen': response.isGarageOpen, 'duration': new Date() } });
    }

    const toggleDoor = () => {
        toggleGarageDoor(state.user.userId, state.auth.bearer, props.device.doorId);
        click();
    }

    return (
        <div>
            <ExpansionPanelDetails className="center">
                <div className="status-text-group">
                    <p className="door-status text">Door: </p>
                    <p className="status-text-bold text">{props.device.doorName}</p>
                </div>
                <div className="status-text-group">
                    <p className="door-status text">Status: </p>
                    {props.device.isOpen
                        ? <p className="status-text-bold text close">Open</p>
                        : <p className="status-text-bold text open">Closed</p>}
                </div>
                <div className="status-text-group">
                    <p className="door-status text">Duration: </p>
                    {statusDays === 0
                        ? <div />
                        : <p className="status-text-bold text">{statusDays}Days</p>}
                    <p className="status-text-bold text">{statusHours}Hr</p>
                    {statusDays === 0
                        ? <p className="status-text-bold text">{statusMins}Min</p>
                        : <div />}
                </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                {props.device.isOpen
                    ? <button data-testid={"update-garage-close"} className="close-button cancel-ripple" onClick={() => openCloseGarageDoor(false)}>Close</button>
                    : <button data-testid={"update-garage-open"} className="open-button success-ripple" onClick={() => openCloseGarageDoor(true)}>Open</button>}
                <button data-testid={"toggle-garage-button"} className="toggle-button ripple" onClick={toggleDoor}>Toggle</button>
            </ExpansionPanelActions>
        </div>
    );
}