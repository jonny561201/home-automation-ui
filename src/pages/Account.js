import React from 'react';
import Header from '../components/header/Header';
import { Divider, TextField } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
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
            succeeded: null,
        }
    }

    onOldPasswordChange = async (input) => {
        await this.setState({ oldPassword: input.target.value, changed: true });
        if (this.state.oldPassword === "" || this.state.oldPassword == null) {
            this.setState({ oldPasswordError: true })
        } else {
            this.setState({ oldPasswordError: false });
        }
    }

    onFirstPasswordChange = async (input) => {
        await this.setState({ firstNewPassword: input.target.value, changed: true });
        if (this.state.firstNewPassword && this.state.secondNewPassword) {
            this.setState({ arePasswordsMismatched: this.state.secondNewPassword !== this.state.firstNewPassword })
        }
    }

    onSecondPasswordChange = async (input) => {
        await this.setState({ secondNewPassword: input.target.value, changed: true });
        if (this.state.firstNewPassword && this.state.secondNewPassword) {
            this.setState({ arePasswordsMismatched: this.state.secondNewPassword !== this.state.firstNewPassword })
        }
    }

    submitAccountChange = async () => {
        if (this.state.changed && !this.state.oldPasswordError && !this.state.arePasswordsMismatched) {
            const response = await updateUserAccount(getStore().getUserId(), this.state.oldPassword, this.state.secondNewPassword);
            this.setState({ succeeded: response.ok });
        } else {
            this.setState({ oldPasswordError: true, arePasswordsMismatched: true })
        }
    }

    passwordMessage = () => {
        if (this.state.succeeded) {
            return <div className="account-message">
                <CheckCircle className="success-text" />
                <p className="success-text">Updated Successfully!</p>
            </div>
        } else if (this.state.succeeded === false) {
            return <div className="account-message">
                <Error className="failure-text"/>
                <p className="failure-text">Password Update Failed</p>
            </div>
        } else {
            return <div><p></p></div>
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
                                <TextField error={this.state.oldPasswordError} value={this.state.oldPassword} variant="outlined" label="Old Password" type="password" onChange={this.onOldPasswordChange} />
                            </div>
                            <div className="account-row">
                                <TextField error={this.state.arePasswordsMismatched} value={this.state.firstNewPassword} variant="outlined" label="New Password" type="password" onChange={this.onFirstPasswordChange} />
                            </div>
                            <div className="account-row">
                                <TextField error={this.state.arePasswordsMismatched} value={this.state.secondNewPassword} variant="outlined" label="Confirm New Password" type="password" onChange={this.onSecondPasswordChange} />
                            </div>
                            {this.passwordMessage()}
                            <Divider className="account-divider" />
                            <button onClick={this.submitAccountChange}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}