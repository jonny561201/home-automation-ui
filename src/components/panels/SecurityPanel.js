import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SecurityIcon from '../../resources/panelIcons/SecurityIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';


export default function SecurityPanel() {
    return (
        <div>
            <ExpansionPanel data-testid={"security-panel"} className="security-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="security" className="logo-image" src={SecurityIcon} />
                        </div>
                        <Typography className="panel-text text">Security</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className="center">
                    <Typography>Test Detail line 2</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}