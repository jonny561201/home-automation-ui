import React, { useContext } from 'react';
import GaragePanel from './GaragePanel';
import BasementPanel from './BasementPanel';
import TemperaturePanel from './TemperaturePanel';
import LightingPanel from './LightingPanel';
import SecurityPanel from './SecurityPanel';
import { Context } from '../../../state/Store';
import './DashboardPanel.css';

export default function DashboardPanel() {

    const [state,] = useContext(Context);
    const roles = state.user.roles || [];

    return (
        <div role="region" aria-label="Dashboard Panels">
            {roles.includes("garage_door") ?
                <div className="panel">
                    <GaragePanel />
                </div>
                : null
            }
            {roles.includes("sump_pump") ?
                <div className="panel">
                    <BasementPanel />
                </div>
                : null
            }
            {roles.includes("thermostat") ?
                <div className="panel">
                    <TemperaturePanel />
                </div>
                : null
            }
            {roles.includes("lighting") ?
                <div className="panel">
                    <LightingPanel />
                </div>
                : null
            }
            {roles.includes("security") ?
                <div className="panel">
                    <SecurityPanel />
                </div>
                : null
            }
        </div>
    );
}