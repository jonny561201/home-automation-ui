import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TemperatureIcon from '../../resources/TemperatureIcon.jpg';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary } from '@material-ui/core';

export default function TemperaturePanel() {
    return (
        <div>
            <ExpansionPanel className="temperature-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="temperature" className="logo-image" src={TemperatureIcon} />
                        </div>
                        <Typography className="panel-text">Temperature</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="center">
                    <Typography>Test Detail line 2</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}