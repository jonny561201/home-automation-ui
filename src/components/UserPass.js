import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './UserPass.css';
import { getBearerToken } from '../utilities/RestApi';


export default class UserPass extends Component {
    constructor(props) {
        super(props);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
        this.getBearerTokenFromLogin = this.getBearerTokenFromLogin.bind(this);
        this.state = {
            username: undefined,
            password: undefined,
            isUsernameInvalid: false,
            isPasswordInvalid: false,
            receivedToken: false
        }
    }

    validateCredentials = async () => {
        this.state.username == null || this.state.username === '' ? this.setState({ isUsernameInvalid: true }) : this.setState({ isUsernameInvalid: false });
        this.state.password == null || this.state.password === '' ? this.setState({ isPasswordInvalid: true }) : this.setState({ isPasswordInvalid: false }, this.getBearerTokenFromLogin());
    }

    getBearerTokenFromLogin = () => {
        if (this.state.isUsernameInvalid === false && this.state.isPasswordInvalid === false) {
            getBearerToken();
            this.setState({ receivedToken: true });
            this.props.updateAuth();
        }
    }

    setUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    setPassword = (event) => {
        this.setState({ password: event.target.value })
    }

    render() {
        if (this.state.receivedToken) {
            return <Redirect to='/home' />
        }
        return (
            <div>
                <div className="column">
                    <input onChange={this.setUsername} type="text" name="Username" placeholder="Username" />
                </div>
                {this.state.isUsernameInvalid
                    ? <p className="error-text"> Invalid username!</p>
                    : <p className="spacer"></p>
                }
                <div className="column">
                    <input onChange={this.setPassword} type="password" name="Password" placeholder="Password" />
                </div>
                {this.state.isPasswordInvalid
                    ? <p className="error-text">Invalid password!</p>
                    : <p className="spacer"></p>
                }
                <button className="column" onClick={this.validateCredentials}>Login</button>
            </div>
        )
    }
}   