import React from 'react';
import Header from '../components/header/Header';
import './Settings.css'
import { Switch, Divider, TextField } from '@material-ui/core';


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const userId = this.props.apiRequests.userId;
        await this.props.apiRequests.getUserPreferences(userId);
    }

    render() {
        return (
            <div>
                <div className="settings-header">
                    <Header />
                </div>
                <div className="settings-body">
                    <div className="settings-wrapper">
                        <div className="settings-group">
                            <h2>Temperature</h2>
                            <Divider />
                            <div className="settings-row">
                                <Switch className="switch" color="primary" />
                                <p className="settings-text">Fahrenheit</p>
                            </div>
                            <div className="settings-row">
                                <TextField variant="outlined" label="City" />
                            </div>
                        </div>
                        <Divider />
                        <button>Save</button>
                    </div>
                </div>
            </div>
        )
    };
}