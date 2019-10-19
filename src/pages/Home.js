import React, { Component } from 'react';
import LogoHeader from '../components/header/LogoHeader';
import Account from '../components/header/Account';
import AccountSettings from '../components/header/AccountSettings';
import DashboardPanel from '../components/panels/DashboardPanels';
import './Home.css';

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
                    <div></div>
                    <div>
                        <h1 className="home-header-text">Home Automation</h1>
                    </div>
                    <Account toggle={this.toggleAccountSettings} />
                </div>
                {this.state.settingsActive
                    ? <AccountSettings />
                    : <div></div>
                }
                <div className="home-body">
                    <div className="center">
                        <DashboardPanel />
                    </div>
                </div>
            </div>
        );
    };
}