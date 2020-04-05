import React from 'react';
import { Link } from 'react-router-dom';
import './AccountSettings.css';
import { getStore } from '../../GlobalState';


export default class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: getStore().getActivePage()
        }
    }

    componentDidMount = () => {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.props.parentRef.contains(event.target) && !this.wrapperRef.contains(event.target)) {
            this.props.toggle();
        }
    }

    getLinks = () => {
        if (this.state.activePage === "Home Automation") {
            return <div>
                <Link to='/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
                <Link to='/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        }
        else if (this.state.activePage === "Settings") {
            return <div>
                <Link to='/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        }
        else {
            return <div>
                <Link to='/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
            </div>
        }
    }

    render() {
        return (
            <div className="account-menu" ref={this.setWrapperRef}>
                <ul>{ this.getLinks() }
                    <Link to='/'>
                        <li><div className="account-button" onClick={() => getStore().updateAuth(false)}>Sign Out</div></li>
                    </Link>
                </ul>
            </div>
        );
    }
}