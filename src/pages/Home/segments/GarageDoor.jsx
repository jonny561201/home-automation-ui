import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../state/Store';
import { useInterval } from '../../../utilities/UseInterval';
import { AccordionDetails } from '@mui/material';
import { WarningAmber } from '@mui/icons-material';
import UpDownIcon from '../../../resources/panelIcons/UpDown.png';
import { BlueButton, GreenButton, RedButton } from '../../../components/controls/Buttons';
import { toggleGarageDoor, updateGarageState } from '../../../utilities/RestApi';
import './GarageDoor.scss'
import {useAuth0} from "@auth0/auth0-react";


export default function GarageDoor(props) {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [statusDays, setStatusDays] = useState();
    const [statusMins, setStatusMins] = useState();
    const [statusHours, setStatusHours] = useState();
    const [exceeded, setExceeded] = useState(false);
    const originalTitle = useRef(document.title);

    useInterval(() => {
        updateGarageDuration();
    }, 2000);

    useEffect(() => {
        return () => { document.title = originalTitle.current; };
    }, []);

    const updateGarageDuration = () => {
        const diffMs = new Date() - new Date(props.device.duration);
        setStatusDays(Math.floor(diffMs / 86400000));
        setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
        setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));

        const alertMinutes = state.preferences ? state.preferences.garageAlertTime : 0;
        const isExceeded = props.device.isOpen && alertMinutes > 0 && (diffMs / 60000) >= alertMinutes;
        setExceeded(isExceeded);

        if (isExceeded) {
            document.title = '\u26A0\uFE0F Garage Open - ' + props.device.doorName;
        } else if (document.title !== originalTitle.current && !isExceeded) {
            document.title = originalTitle.current;
        }
    };

    const openCloseGarageDoor = async (newState) => {
        const token = await auth0.getAccessTokenSilently();
        const response = await updateGarageState(token, newState, props.device.doorId);
        dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { doorName: props.device.doorName, doorId: props.device.doorId, isOpen: response.isGarageOpen, duration: new Date() } });
    }

    const toggleDoor = async () => {
        const token = await auth0.getAccessTokenSilently();
        toggleGarageDoor(token, props.device.doorId);
    }

    return (
        <div>
            <AccordionDetails className="center">
                <div className="garage-door-container">
                    <div className="status-text-group">
                        <p className="garage-text-bold text">{props.device.doorName}</p>
                        {props.device.isOpen
                            ? <p className={"garage-big-text text" + (exceeded ? " alert" : "")}>Opened</p>
                            : <p className="garage-big-text text">Closed</p>}
                        {statusDays === 0
                            ? <p className={"status-text text" + (exceeded ? " alert" : "")}>{statusHours}Hrs {statusMins}Min</p>
                            : <p className={"status-text text" + (exceeded ? " alert" : "")}>{statusDays}Days {statusHours}Hrs</p>}
                    </div>
                    <WarningAmber className={"garage-alert-icon" + (exceeded ? "" : " garage-alert-icon-hidden")} />
                    <div className="status-button-group">
                        {props.device.isOpen
                            ? <RedButton onClick={() => openCloseGarageDoor(false)}>Close</RedButton>
                            : <GreenButton onClick={() => openCloseGarageDoor(true)}>Open</GreenButton>}
                        <BlueButton onClick={toggleDoor}>
                            <img alt="UpDown" className="icon-image" src={UpDownIcon} />
                        </BlueButton>
                    </div>
                </div>
            </AccordionDetails>
        </div>
    );
}
