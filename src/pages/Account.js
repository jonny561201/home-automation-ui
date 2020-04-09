import React from 'react';
import Header from '../components/header/Header';
import { Divider, TextField } from '@material-ui/core';
import { getStore } from '../GlobalState';
import { updateUserAccount } from '../utilities/RestApi';
import './Account.css';

export default class Account extends React.Component {
    constructor(props) {
        super(props)
        getStore().setActivePage('Account')
        this.state = {
            changed: false,
            arePasswordsMismatched: null,
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
            this.setState({arePasswordsMismatched: this.state.secondNewPassword !== this.state.firstNewPassword})
        }
    }

    onSecondPasswordChange = async (input) => {
        await this.setState({secondNewPassword: input.target.value, changed: true});
        if (this.state.firstNewPassword && this.state.secondNewPassword) {
            this.setState({arePasswordsMismatched: this.state.secondNewPassword !== this.state.firstNewPassword})
        }
    }

    submitAccountChange = () => {
        if (this.state.changed && !this.state.oldPasswordError && !this.state.arePasswordsMismatched) {
            updateUserAccount(getStore().getUserId(), this.state.oldPassword, this.state.secondNewPassword)
        } else {
            this.setState({oldPasswordError: true, arePasswordsMismatched: true})
        }
    }

    render() {
        return (
            <div>
                <div className="account-header">
                    <Header />
                </div>
                <div className="account-body">
                    <div className="account-wrapper">
                        <div className="account-group account-text">
                            <h2>Change Password</h2>
                            <Divider />
                            <div className="account-row">
                                <TextField error={this.state.oldPasswordError} value={this.state.oldPassword} variant="outlined" label="Old Password" type="password" onChange={this.onOldPasswordChange}/>
                            </div>
                            <div className="account-row">
                                <TextField error={this.state.arePasswordsMismatched} value={this.state.firstNewPassword} variant="outlined" label="New Password" type="password" onChange={this.onFirstPasswordChange}/>
                            </div>
                            <div className="account-row">
                                <TextField error={this.state.arePasswordsMismatched} value={this.state.secondNewPassword} variant="outlined" label="Confirm New Password" type="password" onChange={this.onSecondPasswordChange} />
                            </div>
                            <Divider className="account-divider"/>
                            <button onClick={this.submitAccountChange}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}