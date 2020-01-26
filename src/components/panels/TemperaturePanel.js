import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Divider, FormControl, FormGroup, FormLabel, Switch, FormControlLabel } from '@material-ui/core';
import './TemperaturePanel.css';
import TemperatureIcon from '../../resources/panelIcons/TemperatureIcon.jpg';
import { getCurrentTemperature, setUserTemperature } from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';
import { debounchApi } from '../../utilities/Services';
import TemperatureImage from './TemperatureImage';
import Knob from '../Knob';


export default class TemperaturePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minTemp: 50.0,
            maxTemp: 90.0,
            mode: "heating",
            isHeating: false,
            isCooling: false,
            desiredTemp: 0.0,
            externalTemp: 0.0,
            internalTemp: 0.0,
            description: "",
            isFahrenheit: true,
            minThermostatTemp: 0.0,
            maxThermostatTemp: 0.0,
            displayColor: "#A0A0A0",
        }
    }

    componentDidMount = async () => {
        const response = await getCurrentTemperature(getStore().getUserId());
        this.setState({
            externalTemp: Math.round(response.temp),
            internalTemp: Math.round(response.currentTemp),
            isFahrenheit: response.isFahrenheit,
            desiredTemp: response.desiredTemp === null ? parseFloat(response.currentTemp.toFixed(0)) : parseFloat(response.desiredTemp.toFixed(0)),
            minThermostatTemp: response.minThermostatTemp,
            maxThermostatTemp: response.maxThermostatTemp,
            isCooling: response.mode === "cooling" ? true : false,
            isHeating: response.mode === "heating" ? true : false,
            mode: response.mode,
            description: response.description,
        });
        this.toggle();
    }

    knobChange = (newValue) => {
        if (this.state.isHeating || this.state.isCooling) {
            this.setState({ desiredTemp: newValue });
            debounchApi(() => setUserTemperature(getStore().getUserId(), newValue, this.state.mode, this.state.isFahrenheit));
        }
    }

    toggleHvac = async (newMode) => {
        newMode === "heating"
            ? await this.setState({ isHeating: !this.state.isHeating, isCooling: false, mode: newMode })
            : await this.setState({ isCooling: !this.state.isCooling, isHeating: false, mode: newMode });
        this.toggleColor()
    }


    toggle = () => {
        if (this.state.isCooling) {
            this.setState({ displayColor: "#27aedb" });
        } else if (this.state.isHeating) {
            this.setState({ displayColor: "#db5127" });
        } else {
            this.setState({ displayColor: "#A0A0A0" });
        }
    }

    toggleColor = () => {
        if (this.state.isCooling) {
            this.setState({ displayColor: "#27aedb" });
            setUserTemperature(getStore().getUserId(), this.state.desiredTemp, this.state.mode, this.state.isFahrenheit);
        } else if (this.state.isHeating) {
            this.setState({ displayColor: "#db5127" });
            setUserTemperature(getStore().getUserId(), this.state.desiredTemp, this.state.mode, this.state.isFahrenheit);
        } else {
            this.setState({ displayColor: "#A0A0A0" });
            setUserTemperature(getStore().getUserId(), this.state.desiredTemp, null, this.state.isFahrenheit);
        }
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
                        <div className="form-container">
                            <div className="form-column">
                                <div >
                                    <TemperatureImage description={this.state.description} />
                                    <p className="internal-temp">{this.state.internalTemp}</p>
                                    <p className="external-temp">{this.state.externalTemp}</p>
                                </div>
                            </div>
                            <div className="form-column">
                                <Knob value={this.state.desiredTemp} lineCap={"round"} fgColor={this.state.displayColor} inputColor={this.state.displayColor}
                                    onChange={this.knobChange} angleArc={240} angleOffset={240} min={this.state.minThermostatTemp} max={this.state.maxThermostatTemp} />
                                <FormControl>
                                    <FormGroup>
                                        <FormControlLabel label="Heat" control={<Switch color="secondary" checked={this.state.isHeating} onChange={() => this.toggleHvac("heating")} />} />
                                        <FormControlLabel label="Cool" control={<Switch color="primary" checked={this.state.isCooling} onChange={() => this.toggleHvac("cooling")} />} />
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </ExpansionPanel>
            </div>
        );
    }
}