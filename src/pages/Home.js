import React, { Component } from 'react';
import Header from '../components/header/Header';
import DashboardPanel from '../components/panels/DashboardPanels';
import './Home.css';
import { useState } from '../TestState';


export default class Home extends Component {
    constructor(props) {
        super(props);
        useState().setActivePage('Home');
    }

    render() {
        return (
            <div className="home-main" >
                <Header />
                <div className="home-body">
                    <div className="center">
                        <DashboardPanel apiRequests={this.props.apiRequests} />
                    </div>
                </div>
            </div>
        );
    };
}