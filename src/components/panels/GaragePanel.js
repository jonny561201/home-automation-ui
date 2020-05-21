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
                    : <GarageDoor device={state.garageRole.devices[0]}/>
                }
            </ExpansionPanel>
        </div>
    );
}