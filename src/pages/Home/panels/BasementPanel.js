import React, { useContext, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasementIcon from '../../../resources/panelIcons/BasementIcon.png';
import SumpPumpLowIcon from '../../../resources/panelIcons/SumpPumpLowIcon.png';
import SumpPumpMediumLowIcon from '../../../resources/panelIcons/SumpPumpMediumLowIcon.png';
import SumpPumpMediumHighIcon from '../../../resources/panelIcons/SumpPumpMediumHighIcon.png';
import SumpPumpHighIcon from '../../../resources/panelIcons/SumpPumpHighIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './BasementPanel.css';
import { Context } from '../../../state/Store';


export default function BasementPanel() {
    const [open, setOpen] = useState(false);
    const [state,] = useContext(Context);

    const getSumpIcon = () => {
        if (state.sumpData.warningLevel === 0) {
            return <img data-testid={"warning-low"} alt="sump pump" className="sump-icon" src={SumpPumpLowIcon} label="warning-low" />
        } else if (state.sumpData.warningLevel === 1) {
            return <img data-testid={"warning-medium-low"} alt="sump pump" className="sump-icon" src={SumpPumpMediumLowIcon} label="warning-medium-low" />
        } else if (state.sumpData.warningLevel === 2) {
            return <img data-testid={"warning-medium-high"} alt="sump pump" className="sump-icon" src={SumpPumpMediumHighIcon} label="warning-medium-high" />
        } else if (state.sumpData.warningLevel === 3) {
            return <img data-testid={"warning-high"} alt="sump pump" className="sump-icon" src={SumpPumpHighIcon} label="warning-high" />
        }
    }

    return (
        <div>
            <ExpansionPanel data-testid={"basement-panel"} className="basement-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => { setOpen(!open) }}>
                    <div className="summary">
                        <img data-testid={"sump-logo"} alt="basement" className="logo-image" src={BasementIcon} />
                        <div>
                            <Typography className="panel-text panel-header-text">Basement</Typography>
                            {!open &&
                                <div className="small-text-group">
                                    <p className="small-text text">Depth:</p>
                                    <p className={"small-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.currentDepth}</p>
                                    <p className={"small-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.depthUnit}</p>
                                </div>
                            }
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className="center">
                    <div className="sump-group">
                        {getSumpIcon()}
                        <div className="sump-measure-group">
                            <div className="sump-text-group">
                                <p className="current-text sump-text text">Current: </p>
                                <p className={"current-depth sump-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.currentDepth}</p>
                                <p className={"current-text sump-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.depthUnit}</p>
                            </div>
                            <div className="sump-text-group">
                                <p className="average-text sump-text text">Average: </p>
                                <p className="average-depth sump-text text">{state.sumpData.averageDepth}</p>
                                <p className="average-text sump-text text">{state.sumpData.depthUnit}</p>
                            </div>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div >
    );
}