import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import RegisterDevice from './RegisterDevice';
import GarageIcon from '../../resources/panelIcons/GarageDoorIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './GaragePanel.css';
import GarageDoor from './GarageDoor';


export default function GaragePanel() {
    const [state,] = useContext(Context);
    const [displayRegister, setDisplayRegister] = useState(false);

    const renderDoors = () => {
        //TODO: need to test all of this behavior
        const devices = state.garageRole.devices;
        if (devices && devices.length > 0) {
            return devices.map(x =>  <GarageDoor key={`door-${x.node_device}`} device={x}/> );
        }
        return <p>No Garge devices have been registered</p>
    }

    return (
        <div>
            <ExpansionPanel className="garage-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img data-testid={"garage-icon"} alt="garage" className="logo-image" src={GarageIcon} />
                        </div>
                        <Typography className="panel-text">Garage</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                {state.devicesToRegister
                    ? <ExpansionPanelDetails className="center">
                        <div>
                            <h2 className="status-text-bold">Register New Device!</h2>
                            <Divider />
                            <div>
                                <p className="status-text">A new device has been detected and needs to be registered.</p>
                            </div>
                            <button data-testid={"register-device-button"} onClick={() => setDisplayRegister(true)}>Register</button>
                            {displayRegister && <RegisterDevice close={() => setDisplayRegister(false)} />}
                        </div>
                     </ExpansionPanelDetails>
                    : <div className="door-groups">{renderDoors()}</div>
                }
            </ExpansionPanel>
        </div>
    );
}