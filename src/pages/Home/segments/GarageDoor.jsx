import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../state/Store';
import { UPDATE_GARAGE_DOORS } from '../../../state/actions';
import { useInterval } from '../../../utilities/UseInterval';
import { AccordionDetails } from '@mui/material';
import { WarningAmber } from '@mui/icons-material';
import UpDownIcon from '../../../resources/panelIcons/UpDown.png';
import { BlueButton, GreenButton, OrangeButton, RedButton } from '../../../components/controls/Buttons';
import { cancelGarageSchedule, scheduleGarageClose, toggleGarageDoor, updateGarageState } from '../../../utilities/RestApi';
import './GarageDoor.scss'


export default function GarageDoor(props) {
    const [state, dispatch] = useContext(Context);
    const [statusDays, setStatusDays] = useState();
    const [statusMins, setStatusMins] = useState();
    const [statusHours, setStatusHours] = useState();
    const [exceeded, setExceeded] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [scheduledCloseTime, setScheduledCloseTime] = useState(null);
    const originalTitle = useRef(document.title);
    const prevIsOpen = useRef(props.device.isOpen);

    useInterval(() => {
        updateGarageDuration();
    }, 2000);

    useEffect(() => {
        return () => { document.title = originalTitle.current; };
    }, []);

    useEffect(() => {
        const wasOpen = prevIsOpen.current;
        prevIsOpen.current = props.device.isOpen;

        const alertMinutes = state.preferences ? state.preferences.garageAlertTime : 0;
        if (props.device.isOpen && !wasOpen && alertMinutes > 0) {
            setScheduledCloseTime(new Date(Date.now() + alertMinutes * 60000));
            setCancelled(false);
            const scheduleClose = async () => {
                await scheduleGarageClose(props.device.doorId);
            };
            scheduleClose();
        }
        if (!props.device.isOpen) {
            setCancelled(false);
            setCountdown(null);
            setScheduledCloseTime(null);
        }
    }, [props.device.isOpen]);

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

        if (scheduledCloseTime && props.device.isOpen && !cancelled) {
            const remainingMs = scheduledCloseTime - new Date();
            if (remainingMs > 0) {
                const mins = Math.floor(remainingMs / 60000);
                const secs = Math.floor((remainingMs % 60000) / 1000);
                setCountdown(`${mins}:${secs.toString().padStart(2, '0')}`);
            } else {
                setCountdown(null);
            }
        } else {
            setCountdown(null);
        }
    };

    const openCloseGarageDoor = async (newState) => {
        const response = await updateGarageState(newState, props.device.doorId);
        dispatch({ type: UPDATE_GARAGE_DOORS, payload: { doorName: props.device.doorName, doorId: props.device.doorId, isOpen: response.isGarageOpen, duration: new Date() } });
    }

    const toggleDoor = async () => {
        toggleGarageDoor(props.device.doorId);
    }

    const cancelAutoClose = async () => {
        setCancelled(true);
        setCountdown(null);
        await cancelGarageSchedule(props.device.doorId);
    }

    return (
        <div>
            <AccordionDetails className="center">
                <div className="garage-door-container container-fluid">
                    <div className="row align-items-center">
                        <div className="col status-text-group">
                            <p className="garage-text-bold text">{props.device.doorName}</p>
                            {props.device.isOpen
                                ? <p className={"garage-big-text text" + (exceeded ? " alert" : "")}>Opened</p>
                                : <p className="garage-big-text text">Closed</p>}
                            {statusDays === 0
                                ? <p className={"status-text text" + (exceeded ? " alert" : "")}>{statusHours}Hrs {statusMins}Min</p>
                                : <p className={"status-text text" + (exceeded ? " alert" : "")}>{statusDays}Days {statusHours}Hrs</p>}
                        </div>
                        <div className="col-auto">
                            <WarningAmber className={"garage-alert-icon" + (exceeded ? "" : " garage-alert-icon-hidden")} />
                        </div>
                        {countdown && !cancelled &&
                            <div className="col-12 col-sm-auto order-last order-sm-0 cancel-slot">
                                <OrangeButton onClick={cancelAutoClose}>Cancel ({countdown})</OrangeButton>
                            </div>
                        }
                        <div className="col-auto main-slot">
                            {props.device.isOpen
                                ? <RedButton onClick={() => openCloseGarageDoor(false)}>Close</RedButton>
                                : <GreenButton onClick={() => openCloseGarageDoor(true)}>Open</GreenButton>}
                        </div>
                        <div className="col-auto toggle-slot">
                            <BlueButton onClick={toggleDoor}>
                                <img alt="UpDown" className="icon-image" src={UpDownIcon} />
                            </BlueButton>
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </div>
    );
}
