import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './UserPass.css';


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
            receivedToken: false,
            isValidLogin: true,
        }
    }

    validateCredentials = async (event) => {
        event.preventDefault();
        this.state.username == null || this.state.username === '' ? this.setState({ isUsernameInvalid: true }) : this.setState({ isUsernameInvalid: false });
        this.state.password == null || this.state.password === '' ? this.setState({ isPasswordInvalid: true }) : this.setState({ isPasswordInvalid: false }, await this.getBearerTokenFromLogin());
    }

    getBearerTokenFromLogin = async () => {
        if (this.state.isUsernameInvalid === false && this.state.isPasswordInvalid === false) {
            const response = await this.props.apiRequests.getBearerToken(this.state.username, this.state.password);
            this.setState({ isValidLogin: response });
            if (this.props.apiRequests.bearerToken != null) {
                this.setState({ receivedToken: true, isValidLogin: response });
                this.props.updateAuth();
            }
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
                <form onSubmit={this.validateCredentials}>
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
                    <div className="error-text">
                        {this.state.isValidLogin
                            ? <p></p>
                            : <p>ERROR: Username or Password is invalid!</p>
                        }
                    </div>
                    <button type="submit" className="column">Login</button>
                </form>
            </div>
        )
    }
}   