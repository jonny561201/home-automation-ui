import React from 'react';
import LogoHeader from '../header/LogoHeader';
import Account from '../header/Account';
import AccountSettings from '../header/AccountSettings';
import './Header.css';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsActive: false,
        }
    }

    toggleAccountSettings = () => {
        this.setState({ settingsActive: !this.state.settingsActive })
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}