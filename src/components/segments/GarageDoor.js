import React, { useContext, useState, useEffect } from 'react';
import useSound from 'use-sound';
import { Context } from '../../state/Store';
import dingSound from '../../resources/ding.mp3';
import { useInterval } from '../../utilities/UseInterval';
import { ExpansionPanelDetails, ExpansionPanelActions } from '@material-ui/core';
import { toggleGarageDoor, updateGarageState, getGarageStatus } from '../../utilities/RestApi';


export default function GarageDoor(props) {
    const [ding] = useSound(dingSound);
    const [state, dispatch] = useContext(Context);
    const [isOpen, setIsOpen] = useState();
    const [duration, setDuration] = useState();
    const [statusDays, setStatusDays] = useState();
    const [statusMins, setStatusMins] = useState();
    const [statusHours, setStatusHours] = useState();

    useEffect(() => {
        getGarageData();
    }, []);

    useInterval(() => {
        updateGarageDuration();
    }, 1000);

    useInterval(async () => {
        await getGarageData();
    }, 30000);

    const updateGarageDuration = () => {
        const diffMs = new Date() - new Date(duration);
        setStatusDays(Math.floor(diffMs / 86400000));
        setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
        setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));
    };

    const getGarageData = async () => {
        const garageStatus = await getGarageStatus(state.userId, props.device.node_device);
        setIsOpen(garageStatus.isGarageOpen);
        setDuration(garageStatus.statusDuration);
        dispatch({ type: 'SET_GARAGE_COORDS', payload: garageStatus.coordinates });
        dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: {'doorName': props.device.node_name, 'isOpen': garageStatus.isGarageOpen} });
    };

    const openCloseGarageDoor = (newState) => {
        updateGarageState(newState, state.userId, props.device.node_device);
        setIsOpen(newState);
        ding();
    }

    return (
        <div>
            <ExpansionPanelDetails className="center">
                <div className="status-text-group">
                    <p className="door-status">Door: </p>
                    <p className="status-text-bold">{props.device.node_name}</p>
                </div>
                <div className="status-text-group">
                    <p className="door-status">Status: </p>
                    {isOpen
                        ? <p className="status-text-bold close">Open</p>
                        : <p className="status-text-bold open">Closed</p>}
                </div>
                <div className="status-text-group">
                    <p className="door-status">Duration: </p>
                    {statusDays === 0
                        ? <div />
                        : <p className="status-text-bold">{statusDays}Days</p>}
                    <p className="status-text-bold">{statusHours}Hr</p>
                    {statusDays === 0
                        ? <p className="status-text-bold">{statusMins}Min</p>
                        : <div />}
                </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                {isOpen
                    ? <button data-testid={"update-garage-close"} className="close-button" onClick={() => openCloseGarageDoor(false)}>Close</button>
                    : <button data-testid={"update-garage-open"} className="open-button" onClick={() => openCloseGarageDoor(true)}>Open</button>}
                <button data-testid={"toggle-garage-button"} className="toggle-button" onClick={() => toggleGarageDoor(state.userId, props.device.node_device)}>Toggle</button>
            </ExpansionPanelActions>
        </div>
    );
}