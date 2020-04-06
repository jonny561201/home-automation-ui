import React from 'react';
import Header from '../components/header/Header';
import { Divider, TextField } from '@material-ui/core';
import { getStore } from '../GlobalState';
import { updateUserAccount } from '../utilities/RestApi';

export default class Account extends React.Component {
    constructor(props) {
        super(props)
        getStore().setActivePage('Account')
        this.state = {
            changed: false,
            doPasswordsMatch: null,
            oldPasswordError: null,
            oldPassword: null,
            firstNewPassword: null,
            secondNewPassword: null,
        }
    }

    onOldPasswordChange = async (input) => {
        await this.setState({oldPassword: input.target.value, changed: true});
        if (this.state.oldPassword === "" || this.state.oldPassword == null) {
            this.setState({oldPasswordError: true})
        } else {
            this.setState({oldPasswordError: false});
        }
    }

    onFirstPasswordChange = async (input) => {
        await this.setState({firstNewPassword: input.target.value, changed: true});
        if (this.state.firstNewPassword && this.state.secondNewPassword) {
            this.setState({doPasswordsMatch: this.state.secondNewPassword !== this.state.firstNewPassword})
        }
    }

    onSecondPasswordChange = async (input) => {
        await this.setState({secondNewPassword: input.target.value, changed: true});
        if (this.state.firstNewPassword && this.state.secondNewPassword) {
            this.setState({doPasswordsMatch: this.state.secondNewPassword !== this.state.firstNewPassword})
        }
    }

    submitAccountChange = () => {
        if (this.state.changed && !this.state.oldPasswordError && !this.state.doPasswordsMatch) {
            updateUserAccount(getStore().getUserId(), this.state.oldPassword, this.state.secondNewPassword)
        } else {
            this.setState({oldPasswordError: true, doPasswordsMatch: true})
        }
    }

    render() {
        return (
            <div>
                <div className="settings-header">
                    <Header />
                </div>
                <div className="settings-body">
                    <div className="settings-wrapper">
                        <div className="settings-group settings-text">
                            <h2>Change Password</h2>
                            <Divider />
                            <div className="settings-row">
                                <TextField error={this.state.oldPasswordError} value={this.state.oldPassword} variant="outlined" label="Old Password" type="password" onChange={this.onOldPasswordChange}/>
                            </div>
                            <div className="settings-row">
                                <TextField error={this.state.doPasswordsMatch} value={this.state.firstNewPassword} variant="outlined" label="New Password" type="password" onChange={this.onFirstPasswordChange}/>
                            </div>
                            <div className="settings-row">
                                <TextField error={this.state.doPasswordsMatch} value={this.state.secondNewPassword} variant="outlined" label="Confirm New Password" type="password" onChange={this.onSecondPasswordChange} />
                            </div>
                            <Divider />
                            <button onClick={this.submitAccountChange}>Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}