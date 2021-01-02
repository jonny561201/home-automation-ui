import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../state/Store';
import RegisterDevice from '../segments/RegisterDevice';
import GarageIcon from '../../resources/panelIcons/GarageDoorIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './GaragePanel.css';
import GarageDoor from '../segments/GarageDoor';


export default function GaragePanel() {
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [displayRegister, setDisplayRegister] = useState(false);
    const [wrapperRef, setWrapperRef] = useState(null);

    const renderDoors = () => {
        //TODO: need to test all of this behavior
        const devices = state.garageRole.devices;
        if (devices && devices.length > 0) {
            return devices.map(x => <GarageDoor key={`door-${x.node_device}`} device={x}/>);
        }
        return <p>No Garge devices have been registered</p>
    }

    const closeModal = () => {
        setDisplayRegister(false);
        if (state.addedGarageNode)
            dispatch({ type: 'SET_DEVICES_TO_REGISTER', payload: false });
    }

    return (
        <div>
            <ExpansionPanel className="garage-panel" onClick={() => { setOpen(!open) }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img data-testid={"garage-icon"} alt="garage" className="logo-image" src={GarageIcon} />
                        </div>
                        <div>
                            <Typography className="panel-text">Garage</Typography>
                            {!open &&
                                state.garageDoors.map(x => {
                                    return <div className="small-text-group" key={`door-notify-${x.node_device}`}>
                                        <p className="small-text">{x.doorName}:</p>
                                        <p className="small-text">{x.isOpen === true ? 'Open' : 'Closed'}</p>
                                    </div>
                                })
                            }
                        </div>
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
                            <div ref={(node) => { setWrapperRef(node) }}>
                                {displayRegister && <RegisterDevice close={closeModal} parentRef={wrapperRef} />}
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                    : <div className="door-groups">{renderDoors()}</div>
                }
            </ExpansionPanel>
        </div>
    );
}