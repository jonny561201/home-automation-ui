import React, { Component } from 'react';

export default class UserPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
           username: null,
           password: null,
           isUsernameInvalid: false,
           isPasswordInvalid: false
        }
    }

    validateCredentials(username, password) {
        if(username==null) {
            this.state.isUsernameInvalid = true;
        };
    }

    render() {
        return (
            <form>
                <div className="column">
                    <input id="username" type="text" name="Username" placeholder="Username" value={this.state.username} />
                </div>
                <div className="column">
                    <input type="password" name="Password" placeholder="Password" />
                </div>
                <button className="column">Login</button>
            </form>
        )
    }
}