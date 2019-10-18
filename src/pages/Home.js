import React, { Component } from 'react';
import './Home.css';
import LogoHeader from '../components/LogoHeader';
import Account from '../components/Account';
import AccountSettings from '../components/AccountSettings';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.toggleAccountSettings = this.toggleAccountSettings.bind(this);
        this.state = {
            settingsActive: false
        }
    }

    toggleAccountSettings = () => {
        this.setState({ settingsActive: !this.state.settingsActive })
    }

    render() {
        return (
            <div className="home-main" >
                <div className="home-header">
                    <div className="test">
                        <LogoHeader />
                    </div>
                    <div className="header-logo-text">
                        <h1 className="home-header-text">Home Automation</h1>
                    </div>
                    <Account toggle={this.toggleAccountSettings} />
                </div>
                {this.state.settingsActive
                    ? <AccountSettings />
                    : <div></div>
                }
                <div className="home-body">
                </div>
            </div>
        );
    };
}