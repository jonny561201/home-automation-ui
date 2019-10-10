import React from 'react';
import './Home.css';
import LogoHeader from './LogoHeader';
import Account from './Account';

function Home() {
    return (
        <div className="home-main">
            <div className="home-header">
                <div className="header-logo-text">
                    <LogoHeader />
                    <h1 className="home-header-text">Home Automation</h1>
                </div>
                <Account />
            </div>
            <div className="home-body">body</div>
        </div>
    );
}

export default Home;