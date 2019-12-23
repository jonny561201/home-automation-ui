import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Divider, FormControl, FormGroup, FormLabel, Switch, FormControlLabel } from '@material-ui/core';
import './TemperaturePanel.css';
import TemperatureIcon from '../../resources/TemperatureIcon.jpg';
import { getCurrentTemperature, setUserTemperature } from '../../utilities/RestApi';
import { getStore } from '../../TestState';
import { debounce } from '../../utilities/Services';
// import Knob from 'react-canvas-knob';


export default class TemperaturePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            internalTemp: 0.0,
            externalTemp: 0.0,
            desiredTemp: 0.0,
            isFahrenheit: true,
            minTemp: 50.0,
            maxTemp: 90.0,
            minThermostatTemp: 0.0,
            mode: "heating",
            displayColor: "#A0A0A0",
            isHeating: false,
            isCooling: false,
        }
    }

    componentDidMount = async () => {
        const response = await getCurrentTemperature(getStore().getUserId());
        this.setState({
            externalTemp: parseFloat(response.temp.toFixed(1)),
            internalTemp: parseFloat(response.currentTemp.toFixed(1)),
            desiredTemp: parseFloat(response.currentTemp.toFixed(0)),
            minThermostatTemp: response.minThermostatTemp,
        });
    }

    // should reset the value of temperature when heating and cooling turned off
    // should set min and max temperatures from back end
    debounchApi = debounce(newValue => {
        setUserTemperature(getStore().getUserId(), newValue, this.state.mode, this.state.isFahrenheit);
    }, 200);

    knobChange = (newValue) => {
        if (this.state.isHeating || this.state.isCooling) {
            this.setState({ desiredTemp: newValue });
            this.debounchApi(newValue);
        }
    }

    toggleHvac = async (newMode) => {
        this.setState({ mode: newMode })
        newMode === "heating"
            ? await this.setState({ isHeating: !this.state.isHeating, isCooling: false })
            : await this.setState({ isCooling: !this.state.isCooling, isHeating: false });
        if (this.state.isCooling) {
            this.setState({ displayColor: "#27aedb" })
        } else if (this.state.isHeating) {
            this.setState({ displayColor: "#db5127" })
        } else {
            this.setState({ displayColor: "#A0A0A0" })
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
                                <p className="internal-temp">{this.state.internalTemp}</p>
                                <p className="external-temp">{this.state.externalTemp}</p>
                            </div>
                            <div className="form-column">
                                {/* <Knob value={this.state.desiredTemp} lineCap={"round"} fgColor={this.state.displayColor} inputColor={this.state.displayColor}
                                    onChange={this.knobChange} angleArc={240} angleOffset={240} title={"Test"} min={this.state.minTemp} max={this.state.maxTemp} /> */}
                            </div>
                            <div className="form-column">
                                <FormControl>
                                    <FormLabel focused={false}>Mode</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel label="Heat" control={<Switch className="heating" color="secondary" checked={this.state.isHeating} onChange={() => this.toggleHvac("heating")} />} />
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