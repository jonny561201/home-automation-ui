import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GarageIcon from '../../resources/panelIcons/GarageDoorIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelActions, Divider } from '@material-ui/core';
import './GaragePanel.css';
import { getGarageStatus, toggleGarageDoor, updateGarageState } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';


export default class GaragePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: getStore().getUserId(),
            isGarageOpen: null,
            garageStatus: null,
            statusDuration: null,
            statusDays: null,
            statusHours: null,
            statusMins: null,
        }
    }

    componentDidMount = async () => {
        const garageStatus = await getGarageStatus(this.state.userId);
        await this.setState({ garageStatus: garageStatus, isGarageOpen: JSON.stringify(garageStatus.isGarageOpen) });
        this.interval = setInterval(() => {
            const duration = new Date(garageStatus.statusDuration);
            const diffMs = new Date() - duration;
            const days = Math.floor(diffMs / 86400000); // days
            const hrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            const mins = Math.round(((diffMs % 86400000) % 3600000) / 60000)

            this.setState({ statusDays: days, statusHours: hrs, statusMins: mins });
        }, 1000);
    };

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };

    openGarageDoor = async (shouldOpen) => {
        await updateGarageState(shouldOpen, this.state.userId);
    };

    toggleGarageDoor = async () => {
        await toggleGarageDoor(this.state.userId);
    };

    render() {
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
                            {this.state.isGarageOpen
                                ? <p className="status-text close">Open</p>
                                : <p className="status-text open">Closed</p>}
                        </div>
                        <div className="status-text-group">
                            <p className="door-status">Duration: </p>
                            {this.state.statusDays === 0
                                ? <div />
                                : <p className="status-text">{this.state.statusDays}Days</p>}
                            <p className="status-text">{this.state.statusHours}Hr</p>
                            {this.state.statusDays === 0
                                ? <p className="status-text">{this.state.statusMins}Min</p>
                                : <div />}
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        {this.state.isGarageOpen
                            ? <button className="close-button" onClick={() => this.openGarageDoor(false)}>Close</button>
                            : <button className="open-button" onClick={() => this.openGarageDoor(true)}>Open</button>}
                        <button className="toggle-button" onClick={this.toggleGarageDoor}>Toggle</button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}