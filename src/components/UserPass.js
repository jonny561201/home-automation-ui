import React, { Component } from 'react';

export default class UserPass extends Component {
    constructor(props) {
        super(props);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
        this.state = {
            username: undefined,
            password: undefined,
            isUsernameInvalid: false,
            isPasswordInvalid: false
        }
    }

    validateCredentials = () => {
        this.state.username == null || this.state.username === '' ? this.setState({ isUsernameInvalid: true }) : this.setState({ isUsernameInvalid: false });
        this.state.password == null || this.state.password === '' ? this.setState({ isPasswordInvalid: true }) : this.setState({ isPasswordInvalid: false });
    }

    setUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    setPassword = (event) => {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <div>
                <div className="column">
                    <input onChange={this.setUsername} type="text" name="Username" placeholder="Username" />
                </div>
                {this.state.isUsernameInvalid &&
                    <p style={{ color: '#ff0000' }}>
                        Invalid username!
                    </p>
                }
                <div className="column">
                    <input onChange={this.setPassword} type="password" name="Password" placeholder="Password" />
                </div>
                {this.state.isPasswordInvalid &&
                    <p style={{ color: '#ff0000' }}>
                        Invalid password!
                    </p>
                }
                <button className="column" onClick={this.validateCredentials}>Login</button>
            </div>
        )
    }
}