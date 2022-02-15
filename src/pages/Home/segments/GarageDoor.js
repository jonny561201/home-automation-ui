import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import { useInterval } from '../../../utilities/UseInterval';
import useSound from 'use-sound';
import dingSound from '../../../resources/ding.mp3';
import clickSound from '../../../resources/click.mp3';
import { ExpansionPanelDetails } from '@material-ui/core';
import UpDownIcon from '../../../resources/panelIcons/UpDown.png';
import { BlueButton, GreenButton, RedButton } from '../../../components/controls/Buttons';
import { toggleGarageDoor, updateGarageState } from '../../../utilities/RestApi';
import './GarageDoor.css'


export default function GarageDoor(props) {
    const [ding] = useSound(dingSound, { volume: 0.25 });
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [state, dispatch] = useContext(Context);
    const [statusDays, setStatusDays] = useState();
    const [statusMins, setStatusMins] = useState();
    const [statusHours, setStatusHours] = useState();

    useInterval(() => {
        updateGarageDuration();
    }, 2000);

    const updateGarageDuration = () => {
        const diffMs = new Date() - new Date(props.device.duration);
        setStatusDays(Math.floor(diffMs / 86400000));
        setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
        setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));
    };

    const openCloseGarageDoor = async (newState) => {
        newState ? ding() : click();
        const response = await updateGarageState(state.user.userId, state.auth.bearer, newState, props.device.doorId);
        dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { doorName: props.device.doorName, doorId: props.device.doorId, isOpen: response.isGarageOpen, duration: new Date() } });
    }

    const toggleDoor = () => {
        toggleGarageDoor(state.user.userId, state.auth.bearer, props.device.doorId);
        click();
    }

    return (
        <div>
            <ExpansionPanelDetails className="center">
                <div className="garage-door-container">
                    <div className="status-text-group">
                        <p className="garage-text-bold text">{props.device.doorName}</p>
                        {props.device.isOpen
                            ? <p className="garage-big-text text">Opened</p>
                            : <p className="garage-big-text text">Closed</p>}
                        {statusDays === 0
                            ? <p className="status-text text">{statusHours}Hrs {statusMins}Min</p>
                            : <p className="status-text text">{statusDays}Days {statusHours}Hrs</p>}
                    </div>
                    <div className="status-button-group">
                        {props.device.isOpen
                            ? <RedButton onClick={() => openCloseGarageDoor(false)}>Close</RedButton>
                            : <GreenButton onClick={() => openCloseGarageDoor(true)}>Open</GreenButton>}
                        <BlueButton onClick={toggleDoor}>
                            <img alt="UpDown" className="icon-image" src={UpDownIcon} />
                        </BlueButton>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </div>
    );
}
