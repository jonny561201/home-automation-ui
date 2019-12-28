import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasementIcon from '../../resources/BasementIcon.jpg';
import SumpPumpIcon from '../../resources/SumpPumpIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './BasementPanel.css';
import { getSumpLevels } from '../../utilities/RestApi';
import { getStore } from '../../TestState';


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
            averageSumpDepth: parseFloat(response.averageDepth.toFixed(1))
        });
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
                                    <p className="current-text sump-text">Current: </p>
                                    <p className={"current-depth sump-text " + (this.state.warningLevel === 3 ? 'alert' : 'healthy')}>{this.state.currentSumpDepth}</p>
                                    <p className="current-text sump-text">{this.state.depthUnit}</p>
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