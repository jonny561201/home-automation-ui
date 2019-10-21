import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GarageIcon from '../../resources/GarageDoorIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelActions, Divider } from '@material-ui/core';
import './GaragePanel.css';


export default class GaragePanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const test = this.props.apiRequests.getGarageStatus();
        console.log('Garage Door Status: ' + JSON.stringify(test));
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
                        <Typography>Test Detail line 2</Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <button>Open</button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}