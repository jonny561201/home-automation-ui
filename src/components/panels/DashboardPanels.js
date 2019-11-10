import React from 'react';
import GaragePanel from './GaragePanel';
import BasementPanel from './BasementPanel';
import TemperaturePanel from './TemperaturePanel';
import LightingPanel from './LightingPanel';
import SecurityPanel from './SecurityPanel';

export default function DashboardPanel(props) {
    return (
        <div>
            <div className="panel">
                <GaragePanel apiRequests={props.apiRequests} />
            </div>
            <div className="panel">
                <BasementPanel apiRequests={props.apiRequests} />
            </div>
            <div className="panel">
                <TemperaturePanel apiRequests={props.apiRequests} />
            </div>
            <div className="panel">
                <LightingPanel />
            </div>
            <div className="panel">
                <SecurityPanel />
            </div>
        </div>
    );
}