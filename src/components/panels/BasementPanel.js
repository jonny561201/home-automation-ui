import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasementIcon from '../../resources/BasementIcon.jpg';
import SumpPumpIcon from '../../resources/SumpPumpIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './BasementPanel.css';
import { flexbox } from '@material-ui/system';


export default class BasementPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSumpDepth: 0.0,
            averageSumpDepth: 0.0,
        }
    }

    async componentDidMount() {
        await this.props.apiRequests.getSumpLevels();
    }

    render() {
        return (
            <div>
                <ExpansionPanel className="basement-panel">
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="summary">
                            <div>
                                <img alt="basement" className="logo-image" src={BasementIcon} />
                            </div>
                            <Typography className="panel-text">Basement</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <Divider />
                    <ExpansionPanelDetails className="center">
                        <div className="sump-group">
                            <img alt="sump pump" className="sump-icon" src={SumpPumpIcon} />
                            <div className="sump-measure-group">
                                <div className="sump-text-group">
                                    <p className="current-text">Current: </p>
                                    <p className="current-depth">{this.state.currentSumpDepth}</p>
                                </div>
                                <div className="sump-text-group">
                                    <p className="average-text">Average: </p>
                                    <p className="average-depth">{this.state.averageSumpDepth}</p>
                                </div>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div >
        );
    }
}