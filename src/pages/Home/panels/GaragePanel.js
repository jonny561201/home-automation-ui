import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import RegisterDevice from '../segments/RegisterDevice';
import GarageIcon from '../../../resources/panelIcons/GarageDoorIcon.png';
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
        const devices = state.garageDoors;
        if (devices && devices.length > 0) {
            return devices.map(x => <GarageDoor key={`door-${x.doorName}`} device={x} />);
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
            <ExpansionPanel className="garage-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => { setOpen(!open) }}>
                    <div className="summary">
                        <img data-testid={"garage-icon"} alt="garage" className="logo-image" src={GarageIcon} />
                        <div>
                            <Typography className="panel-text panel-header-text">Garage</Typography>
                            <div className="small-text-container">
                                {!open &&
                                    state.garageDoors.map(x => {
                                        return <div className="small-text-group" key={`door-notify-${x.doorName}`}>
                                            <p className="small-text text">{x.doorName}:</p>
                                            <p className={"small-text text " + (x.isOpen ? 'alert' : 'healthy')}>{x.isOpen ? 'Open' : 'Closed'}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                {state.devicesToRegister
                    ? <ExpansionPanelDetails className="center">
                        <h2 className="status-text-bold text">Register New Device!</h2>
                        <Divider />
                        <div>
                            <p className="status-text text">A new device has been detected and needs to be registered.</p>
                        </div>
                        <div>
                            <button className="success-ripple" data-testid={"register-device-button"} onClick={() => setDisplayRegister(true)}>Register</button>
                        </div>
                        <div ref={(node) => { setWrapperRef(node) }}>
                            {displayRegister && <RegisterDevice close={closeModal} parentRef={wrapperRef} />}
                        </div>
                    </ExpansionPanelDetails>
                    : <div className="door-groups">{renderDoors()}</div>
                }
            </ExpansionPanel>
        </div>
    );
}