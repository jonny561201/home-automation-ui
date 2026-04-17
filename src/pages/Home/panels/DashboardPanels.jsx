import React, { useContext } from 'react';
import GaragePanel from './GaragePanel';
import BasementPanel from './BasementPanel';
import TemperaturePanel from './TemperaturePanel';
import LightingPanel from './LightingPanel';
import SecurityPanel from './SecurityPanel';
import { Context } from '../../../state/Store';
import './DashboardPanel.scss';

export default function DashboardPanel() {

    const [state,] = useContext(Context);
    const roles = state.user.roles || [];
    const unregistered = (state.devices || []).filter(x => !x.registered);

    const showPanel = (type) => {
        return roles.includes(type) || unregistered.some(d => d.type === type);
    };

    const hasAnyPanel = showPanel("garage_door") || showPanel("sump_pump") || showPanel("thermostat") || showPanel("lighting") || showPanel("security");

    return (
        <div role="region" aria-label="Dashboard Panels">
            {!hasAnyPanel &&
                <p className="panel text">No devices have been assigned to your account.</p>
            }
            {showPanel("garage_door") &&
                <div className="panel"><GaragePanel /></div>
            }
            {showPanel("sump_pump") &&
                <div className="panel"><BasementPanel /></div>
            }
            {showPanel("thermostat") &&
                <div className="panel"><TemperaturePanel /></div>
            }
            {showPanel("lighting") &&
                <div className="panel"><LightingPanel /></div>
            }
            {showPanel("security") &&
                <div className="panel"><SecurityPanel /></div>
            }
        </div>
    );
}
