import React from 'react';
import Header from '../components/header/Header';
import './Settings.css'
import { Divider, TextField, FormControlLabel, RadioGroup, FormControl, FormLabel, Radio } from '@material-ui/core';
import { getStore } from '../TestState';
import { getUserPreferences, updateUserPreferences } from '../utilities/RestApi';


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        getStore().setActivePage('Settings');
        this.state = {
            city: null,
            newCity: null,
            isEditMode: false,
            isFahrenheit: null,
            unit: null,
            newUnit: null,
            edited: false,
        }
    }

    componentDidMount = async () => {
        const response = await getUserPreferences(getStore().getUserId());
        this.setState({ city: response.city, unit: response.unit, newCity: response.city, newUnit: response.unit });
    }

    toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    savePreferences = () => {
        const isFahrenheit = this.state.newUnit === "imperial";
        updateUserPreferences(getStore().getUserId(), isFahrenheit, this.state.newCity);
        this.toggleEditMode();
        this.setState({ edited: false, city: this.state.newCity, unit: this.state.newUnit });
    }

    cancelPreferences = () => {
        this.setState({ newCity: this.state.city, newUnit: this.state.unit });
        this.toggleEditMode();
    }

    updateCity = (input) => {
        this.setState({ newCity: input.target.value, edited: true });
    }

    updateRadioButton = (input) => {
        const value = input.target.value;
        this.setState({ newUnit: value, edited: true });
    }

    render() {
        return (
            <div>
                <div className="settings-header">
                    <Header />
                </div>
                <div className="settings-body">
                    {this.state.isEditMode ?
                        <div className="settings-wrapper">
                            <div className="settings-group settings-text">
                                <h2>Temperature</h2>
                                <Divider />
                                <div className="settings-row">
                                    <FormControl>
                                        <FormLabel component="legend">Unit</FormLabel>
                                        <RadioGroup label="Unit:">
                                            <FormControlLabel onChange={this.updateRadioButton} value="imperial" checked={this.state.newUnit === "imperial"} control={<Radio color="primary" />} label="Imperial" />
                                            <FormControlLabel onChange={this.updateRadioButton} value="metric" checked={this.state.newUnit === "metric"} control={<Radio color="primary" />} label="Metric" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="settings-row">
                                    <TextField variant="outlined" label="City" value={this.state.newCity} onChange={this.updateCity} />
                                </div>
                            </div>
                            <Divider />
                            <button className="submit" disabled={!this.state.edited} onClick={this.savePreferences}>Save</button>
                            <button className="cancel" onClick={this.cancelPreferences}>Cancel</button>
                        </div>
                        : <div className="settings-wrapper">
                            <div className="settings-group settings-text">
                                <h2>Temperature</h2>
                            </div>
                            <Divider />
                            <div className="settings-row">
                                <p className="settings-text unit">Unit:</p>
                                <p className="settings-text unit">{this.state.unit}</p>
                            </div>
                            <div className="settings-row">
                                <p className="settings-text city">City:</p>
                                <p className="settings-text city">{this.state.city}</p>
                            </div>
                            <div className="settings-wrapper settings-text">
                                <h2>Measurement</h2>
                            </div>
                            <Divider />
                            <Divider />
                            <button onClick={this.toggleEditMode}>Edit</button>
                        </div>
                    }
                </div>
            </div>
        )
    };
}