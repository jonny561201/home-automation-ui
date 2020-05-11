import React, { useState, useEffect, useContext } from 'react';
import {Context} from '../../state/Store';
import RegisterDevice from './RegisterDevice';
import GarageIcon from '../../resources/panelIcons/GarageDoorIcon.jpg';
import { getGarageStatus, toggleGarageDoor, updateGarageState } from '../../utilities/RestApi';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelActions, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './GaragePanel.css';


export default function GaragePanel() {
    const [state, ] = useContext(Context);
    const [interval, setMyInterval] = useState(null);
    const [statusDays, setStatusDays] = useState(null);
    const [statusMins, setStatusMins] = useState(null);
    const [statusHours, setStatusHours] = useState(null);
    const [isGarageOpen, setIsGarageOpen] = useState(null);
    const [garageDuration, setGarageDuration] = useState(null);
    const [displayRegister, setDisplayRegister] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const garageStatus = await getGarageStatus(state.userId);
            setIsGarageOpen(garageStatus.isGarageOpen)
            setGarageDuration(garageStatus.statusDuration)
        };
        getData();
        setMyInterval(setInterval(() => {
            const duration = new Date(garageDuration);
            const diffMs = new Date() - duration;
            setStatusDays(Math.floor(diffMs / 86400000));
            setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
            setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));
        }, 1000));
        return () => {
            clearInterval(interval);
        };
    }, [statusDays, statusHours, statusMins, isGarageOpen, state.userId, garageDuration]);

    return (
        <div>
            <ExpansionPanel className="garage-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img data-testid={"garage-icon"} alt="garage" className="logo-image" src={GarageIcon} />
                        </div>
                        <Typography className="panel-text">Garage</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                {state.devicesToRegister
                    ? <ExpansionPanelDetails className="center">
                        <div>
                            <h2 className="status-text-bold">Register New Device!</h2>
                            <Divider />
                            <div>
                                <p className="status-text">A new device has been detected and needs to be registered.</p>
                            </div>
                            <button data-testid={"register-device-button"} onClick={() => setDisplayRegister(true)}>Register</button>
                        {displayRegister && <RegisterDevice close={() => setDisplayRegister(false)}/>}
                        </div>
                    </ExpansionPanelDetails>
                    : <div>
                        <ExpansionPanelDetails className="center">
                            <div className="status-text-group">
                                <p className="door-status">Door Status: </p>
                                {isGarageOpen
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
                            {isGarageOpen
                                ? <button data-testid={"update-garage-close"} className="close-button" onClick={() => updateGarageState(false, state.userId)}>Close</button>
                                : <button data-testid={"update-garage-open"} className="open-button" onClick={() => updateGarageState(true, state.userId)}>Open</button>}
                            <button data-testid={"toggle-garage-button"} className="toggle-button" onClick={() => toggleGarageDoor(state.userId)}>Toggle</button>
                        </ExpansionPanelActions>
                    </div>
                }
            </ExpansionPanel>
        </div>
    );
}