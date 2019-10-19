import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasementIcon from '../../resources/BasementIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary } from '@material-ui/core';
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
                <ExpansionPanelDetails className="center">
                    <Typography>Test Detail line 2</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}