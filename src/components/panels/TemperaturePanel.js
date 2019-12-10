import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TemperatureIcon from '../../resources/TemperatureIcon.jpg';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './TemperaturePanel.css';
import {getCurrentTemperature} from '../../utilities/RestApi';
import {getStore} from '../../TestState';


export default class TemperaturePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            internalTemp: 0.0,
            externalTemp: 0.0,
        }
    }

    componentDidMount = async () => {
        const response = await getCurrentTemperature(getStore().getUserId());
        this.setState({ externalTemp: response.temp });
        this.setState({ internalTemp: response.currentTemp });
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
                        <div>
                            <p className="internal-temp">{this.state.internalTemp}</p>
                        </div>
                        <div>
                            <p className="external-temp">{this.state.externalTemp}</p>
                        </div>
                    </div>
                </ExpansionPanel>
            </div>
        );
    }
}