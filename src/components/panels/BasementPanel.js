import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasementIcon from '../../resources/BasementIcon.jpg';
import SumpPumpIcon from '../../resources/SumpPumpIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './BasementPanel.css';


export default function BasementPanel() {
    return (
        <div>
            <ExpansionPanel className="basement-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="basement" className="logo-image" src={BasementIcon} />
                        </div>
                        <Typography className="panel-text">Basement</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className="center">
                    <img alt="sump pump" className="sump-icon" src={SumpPumpIcon} />
                    <Typography>Test Detail line 2</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}