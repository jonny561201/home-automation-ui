import React from 'react';
import { Redirect } from 'react-router-dom';
import './UserPass.css';
import { getBearerToken } from '../../utilities/RestApi'
import { getStore } from '../../GlobalState';


export default class UserPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined,
            isUsernameInvalid: false,
            isPasswordInvalid: false,
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
            const response = await getBearerToken(this.state.username, this.state.password);
            this.setState({ isValidLogin: response });
            if (response) {
                getStore().updateAuth(true);
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
        if (getStore().isAuthenticated()) {
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