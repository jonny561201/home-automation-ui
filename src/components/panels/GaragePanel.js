import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GarageIcon from '../../resources/GarageDoorIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelActions, Divider } from '@material-ui/core';
import './GaragePanel.css';


export default class GaragePanel extends React.Component {
    constructor(props) {
        super(props);
        this.openGarageDoor = this.openGarageDoor.bind(this);
        this.state = {
            isGarageOpen: null
        }
    }

    async componentDidMount() {
        const garageStatus = await this.props.apiRequests.getGarageStatus();
        this.setState({ isGarageOpen: JSON.stringify(garageStatus.isGarageOpen) });
    }

    openGarageDoor = async (shouldOpen) => {
        await this.props.apiRequests.updateGarageState(shouldOpen);
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
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        {this.state.isGarageOpen
                            ? <button className="close-button" onClick={() => this.openGarageDoor(false)}>Close</button>
                            : <button className="open-button" onClick={() => this.openGarageDoor(true)}>Open</button>}
                        <button className="toggle-button">Toggle</button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}