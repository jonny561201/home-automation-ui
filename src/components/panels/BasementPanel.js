import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasementIcon from '../../resources/panelIcons/BasementIcon.jpg';
import SumpPumpLowIcon from '../../resources/panelIcons/SumpPumpLowIcon.png';
import SumpPumpMediumLowIcon from '../../resources/panelIcons/SumpPumpMediumLowIcon.png';
import SumpPumpMediumHighIcon from '../../resources/panelIcons/SumpPumpMediumHighIcon.png';
import SumpPumpHighIcon from '../../resources/panelIcons/SumpPumpHighIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './BasementPanel.css';
import { getSumpLevels } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';


export default class BasementPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSumpDepth: 0.0,
            averageSumpDepth: 0.0,
            depthUnit: null,
            warningLevel: 0,
        }
    }

    componentDidMount = async () => {
        const response = await getSumpLevels(getStore().getUserId());
        this.setState({
            warningLevel: response.warningLevel,
            depthUnit: response.depthUnit,
            currentSumpDepth: parseFloat(response.currentDepth.toFixed(1)),
            averageSumpDepth: parseFloat(response.averageDepth.toFixed(1)),
        });
    }

    getSumpIcon = () => {
        if (this.state.warningLevel === 0) {
            return <img alt="sump pump" className="sump-icon" src={SumpPumpLowIcon} label="warning-low" />
        } else if (this.state.warningLevel === 1) {
            return <img alt="sump pump" className="sump-icon" src={SumpPumpMediumLowIcon} label="warning-medium-low" />
        } else if (this.state.warningLevel === 2) {
            return <img alt="sump pump" className="sump-icon" src={SumpPumpMediumHighIcon} label="warning-medium-high" />
        } else if (this.state.warningLevel === 3) {
            return <img alt="sump pump" className="sump-icon" src={SumpPumpHighIcon} label="warning-high" />
        }
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
                            {this.getSumpIcon()}
                            <div className="sump-measure-group">
                                <div className="sump-text-group">
                                    <p className="current-text sump-text">Current: </p>
                                    <p className={"current-depth sump-text " + (this.state.warningLevel === 3 ? 'alert' : 'healthy')}>{this.state.currentSumpDepth}</p>
                                    <p className={"current-text sump-text " + (this.state.warningLevel === 3 ? 'alert' : 'healthy')}>{this.state.depthUnit}</p>
                                </div>
                                <div className="sump-text-group">
                                    <p className="average-text sump-text">Average: </p>
                                    <p className="average-depth sump-text">{this.state.averageSumpDepth}</p>
                                    <p className="average-text sump-text">{this.state.depthUnit}</p>
                                </div>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div >
        );
    }
}