import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GarageIcon from '../../resources/GarageDoorIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelActions, Divider } from '@material-ui/core';
import './GaragePanel.css';


export default class GaragePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGarageOpen: null
        }
    }

    async componentDidMount() {
        const garageStatus = await this.props.apiRequests.getGarageStatus();
        this.setState({ isGarageOpen: JSON.stringify(garageStatus.isGarageOpen) });
    }

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
                            <p className="status-text">{this.state.isGarageOpen ? 'Open' : 'Closed'}</p>
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        {this.state.isGarageOpen
                            ? <button className="close-button">Close</button>
                            : <button className="open-button">Open</button>}
                        <button className="toggle-button">Toggle</button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}