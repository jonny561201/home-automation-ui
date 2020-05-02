import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GarageIcon from '../../resources/panelIcons/GarageDoorIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelActions, Divider } from '@material-ui/core';
import './GaragePanel.css';
import { getGarageStatus, toggleGarageDoor, updateGarageState } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';


export default function GaragePanel() {
    const [userId, ] = useState(getStore().getUserId());
    const [statusDays, setStatusDays] = useState(null);
    const [statusHours, setStatusHours] = useState(null);
    const [statusMins, setStatusMins] = useState(null);
    const [isGarageOpen, setIsGarageOpen] = useState(null);
    const [interval, setMyInterval] = useState(null)

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
    }, []);

    return (
        <div>
            <ExpansionPanel className="garage-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="garage" className="logo-image" src={GarageIcon} />
                        </div>
                        <Typography className="panel-text">Garage</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className="center">
                    <div className="status-text-group">
                        <p className="door-status">Door Status: </p>
                        {isGarageOpen
                            ? <p className="status-text close">Open</p>
                            : <p className="status-text open">Closed</p>}
                    </div>
                    <div className="status-text-group">
                        <p className="door-status">Duration: </p>
                        {statusDays === 0
                            ? <div />
                            : <p className="status-text">{statusDays}Days</p>}
                        <p className="status-text">{statusHours}Hr</p>
                        {statusDays === 0
                            ? <p className="status-text">{statusMins}Min</p>
                            : <div />}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    {isGarageOpen
                        ? <button data-testid={"update-garage-close"} className="close-button" onClick={() => updateGarageState(false, userId)}>Close</button>
                        : <button data-testid={"update-garage-open"}className="open-button" onClick={() => updateGarageState(true, userId)}>Open</button>}
                    <button data-testid={"toggle-garage-button"} className="toggle-button" onClick={() => toggleGarageDoor(userId)}>Toggle</button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
}