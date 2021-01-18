import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary } from '@material-ui/core';


export default function LightAlarm(props) {

    return (
        <>
            <ExpansionPanel className="task-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div>
                        <div className="alarm-setting-group" data-testid="light-alarm-group">
                            <div className="settings-row alarm-row">
                                <p className="settings-text alarm-time">{props.lightTime}</p>
                            </div>
                            <div className="settings-row alarm-row">
                                <p className="settings-text alarm-group-name">{props.groupName}</p>
                            </div>
                        </div>
                        <div className="settings-row alarm-row">
                            <p className="settings-text measure-unit">{props.lightDays}</p>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="center">
                    <Typography>Test Detail line 2</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}