import React from 'react';
import Header from '../components/header/Header';
import './Settings.css'
import { Divider, TextField, FormControlLabel, RadioGroup, FormControl, FormLabel, Radio } from '@material-ui/core';


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.props.updatePage("Settings");
        this.state = {
            city: null,
            isEditMode: false,
            isFahrenheit: null,
            unit: null,
            edited: false,
        }
    }

    componentDidMount = async () => {
        const userId = this.props.apiRequests.userId;
        const response = await this.props.apiRequests.getUserPreferences(userId);
        this.setState({ city: response.city, unit: response.unit });
    }

    toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    savePreferences = () => {
        this.props.apiRequests.updateUserPreferences(this.props.apiRequests.userId, this.state.isFahrenheit, this.state.city);
        this.toggleEditMode();
        this.setState({ edited: false });
    }

    updateCity = (input) => {
        this.setState({ city: input.target.value, edited: true });
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
                                            <FormControlLabel value="true" control={<Radio color="primary" />} label="Imperial" />
                                            <FormControlLabel value="false" control={<Radio color="primary" />} label="Metric" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="settings-row">
                                    <TextField variant="outlined" label="City" value={this.state.city} onChange={this.updateCity} />
                                </div>
                            </div>
                            <Divider />
                            <button className="submit" disabled={!this.state.edited} onClick={this.savePreferences}>Save</button>
                            <button className="cancel" onClick={this.toggleEditMode}>Cancel</button>
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
                            <Divider />
                            <button onClick={this.toggleEditMode}>Edit</button>
                        </div>
                    }
                </div>
            </div>
        )
    };
}