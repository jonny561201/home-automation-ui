import React, { useEffect, useState } from 'react';
import { useInterval } from '../../utilities/UseInterval';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasementIcon from '../../resources/panelIcons/BasementIcon.png';
import SumpPumpLowIcon from '../../resources/panelIcons/SumpPumpLowIcon.png';
import SumpPumpMediumLowIcon from '../../resources/panelIcons/SumpPumpMediumLowIcon.png';
import SumpPumpMediumHighIcon from '../../resources/panelIcons/SumpPumpMediumHighIcon.png';
import SumpPumpHighIcon from '../../resources/panelIcons/SumpPumpHighIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './BasementPanel.css';
import { getSumpLevels } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';


export default function BasementPanel() {
    const [open, setOpen] = useState(false);
    const [depthUnit, setDepthUnit] = useState(null);
    const [warningLevel, setWarningLevel] = useState(0);
    const [currentSumpDepth, setCurrentSumpDepth] = useState(0.0);
    const [averageSumpDepth, setAverageSumpDepth] = useState(0.0);

    useEffect(() => {
        getSumpData();
    }, []);

    useInterval(async () => {
        await getSumpData();
    }, 120000);

    const getSumpData = async () => {
        const response = await getSumpLevels(getStore().getUserId());
        setWarningLevel(response.warningLevel);
        setDepthUnit(response.depthUnit);
        setCurrentSumpDepth(response.currentDepth.toFixed(1));
        setAverageSumpDepth(response.averageDepth.toFixed(1));
    };

    const getSumpIcon = () => {
        if (warningLevel === 0) {
            return <img data-testid={"warning-low"} alt="sump pump" className="sump-icon" src={SumpPumpLowIcon} label="warning-low" />
        } else if (warningLevel === 1) {
            return <img data-testid={"warning-medium-low"} alt="sump pump" className="sump-icon" src={SumpPumpMediumLowIcon} label="warning-medium-low" />
        } else if (warningLevel === 2) {
            return <img data-testid={"warning-medium-high"} alt="sump pump" className="sump-icon" src={SumpPumpMediumHighIcon} label="warning-medium-high" />
        } else if (warningLevel === 3) {
            return <img data-testid={"warning-high"} alt="sump pump" className="sump-icon" src={SumpPumpHighIcon} label="warning-high" />
        }
    }

    return (
        <div>
            <ExpansionPanel data-testid={"basement-panel"} className="basement-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => { setOpen(!open) }}>
                    <div className="summary">
                        <div>
                            <img data-testid={"sump-logo"} alt="basement" className="logo-image" src={BasementIcon} />
                        </div>
                        <div>
                            <Typography className="panel-text">Basement</Typography>
                            {!open &&
                                <div className="small-text-group">
                                    <p className="small-text">Depth:</p>
                                    <p className={"small-text " + (warningLevel === 3 ? 'alert' : 'healthy')}>{currentSumpDepth}</p>
                                    <p className={"small-text " + (warningLevel === 3 ? 'alert' : 'healthy')}>{depthUnit}</p>
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
                                <p className="current-text sump-text">Current: </p>
                                <p className={"current-depth sump-text " + (warningLevel === 3 ? 'alert' : 'healthy')}>{currentSumpDepth}</p>
                                <p className={"current-text sump-text " + (warningLevel === 3 ? 'alert' : 'healthy')}>{depthUnit}</p>
                            </div>
                            <div className="sump-text-group">
                                <p className="average-text sump-text">Average: </p>
                                <p className="average-depth sump-text">{averageSumpDepth}</p>
                                <p className="average-text sump-text">{depthUnit}</p>
                            </div>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div >
    );
}