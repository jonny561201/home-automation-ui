import React from 'react';
import LogoHeader from '../header/LogoHeader';
import Account from '../header/Account';
import AccountSettings from '../header/AccountSettings';
import './Header.css';
import { getStore } from '../../TestState';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.activePage = getStore().getActivePage();
        this.state = {
            settingsActive: false,
        }
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    toggleAccountSettings = () => {
        this.setState({ settingsActive: !this.state.settingsActive })
    }

    render() {
        return (
            <div className="header">
                <div className="home-header">
                    <div className="logo-container">
                        <LogoHeader />
                    </div>
                    <div></div>
                    <div>
                        <h1 className="home-header-text">{this.activePage}</h1>
                    </div>
                    <div ref={this.setWrapperRef}>
                        <Account toggle={this.toggleAccountSettings} />
                    </div>
                </div>
                {this.state.settingsActive
                    ? <AccountSettings toggle={this.toggleAccountSettings} parentRef={this.wrapperRef} />
                    : <div></div>
                }
            </div>
        );
    }
}