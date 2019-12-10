import React, { Component } from 'react';
import Header from '../components/header/Header';
import DashboardPanel from '../components/panels/DashboardPanels';
import './Home.css';
import { getStore } from '../TestState';


export default function Home() {
    getStore().setActivePage('Home');
    
    return (
        <div className="home-main" >
            <Header />
            <div className="home-body">
                <div className="center">
                    <DashboardPanel />
                </div>
            </div>
        </div>
    );
}