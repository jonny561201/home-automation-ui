import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GarageIcon from '../../resources/panelIcons/GarageDoorIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelActions, Divider } from '@material-ui/core';
import './GaragePanel.css';
import { getGarageStatus, toggleGarageDoor, updateGarageState } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';
import RegisterDevice from './RegisterDevice';


export default function GaragePanel() {
    const [hasDevicesToRegister,] = useState(getStore().hasUnregisteredDevices());
    const [userId,] = useState(getStore().getUserId());
    const [statusDays, setStatusDays] = useState(null);
    const [statusHours, setStatusHours] = useState(null);
    const [statusMins, setStatusMins] = useState(null);
    const [isGarageOpen, setIsGarageOpen] = useState(null);
    const [interval, setMyInterval] = useState(null);
    const [displayRegister, setDisplayRegister] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const garageStatus = await getGarageStatus(userId);
            setIsGarageOpen(garageStatus.isGarageOpen)
            setMyInterval(setInterval(() => {
                const duration = new Date(garageStatus.statusDuration);
                const diffMs = new Date() - duration;
                setStatusDays(Math.floor(diffMs / 86400000));
                setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
                setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));
            }, 1000));
        };
        getData();
        return () => {
            clearInterval(interval);
        };
    }, [statusDays, statusHours, statusMins, isGarageOpen, userId]);

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
                {hasDevicesToRegister
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
                                ? <button data-testid={"update-garage-close"} className="close-button" onClick={() => updateGarageState(false, userId)}>Close</button>
                                : <button data-testid={"update-garage-open"} className="open-button" onClick={() => updateGarageState(true, userId)}>Open</button>}
                            <button data-testid={"toggle-garage-button"} className="toggle-button" onClick={() => toggleGarageDoor(userId)}>Toggle</button>
                        </ExpansionPanelActions>
                    </div>
                }
            </ExpansionPanel>
        </div>
    );
}