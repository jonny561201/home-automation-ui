import React, { Component } from 'react';
import Header from '../components/header/Header';
import DashboardPanel from '../components/panels/DashboardPanels';
import './Home.css';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.props.updatePage("Home")
    }

    render() {
        return (
            <div className="home-main" >
                <Header activePage={this.props.activePage} />
                <div className="home-body">
                    <div className="center">
                        <DashboardPanel apiRequests={this.props.apiRequests} />
                    </div>
                </div>
            </div>
        );
    };
}