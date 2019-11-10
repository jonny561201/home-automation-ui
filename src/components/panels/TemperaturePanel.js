import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TemperatureIcon from '../../resources/TemperatureIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './TemperaturePanel.css';


export default class TemperaturePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            internalTemp: 0.0,
        }
    }

    async componentDidMount() {
        await this.props.apiRequests.getCurrentTemperature(this.props.apiRequests.userId);
    }

    render() {
        return (
            <div>
                <ExpansionPanel className="temperature-panel">
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="summary">
                            <div>
                                <img alt="temperature" className="logo-image" src={TemperatureIcon} />
                            </div>
                            <Typography className="panel-text">Temperature</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <Divider />
                    <div>
                        <p className="internal-temp-digits">{this.state.internalTemp}</p>
                    </div>
                    {/* <ExpansionPanelDetails className="center">
                        <Typography>Test Detail line 2</Typography>
                    </ExpansionPanelDetails> */}
                </ExpansionPanel>
            </div>
        );
    }
}