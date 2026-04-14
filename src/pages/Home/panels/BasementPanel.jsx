import React, { useContext, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasementIcon from '../../../resources/panelIcons/BasementIcon.png';
import SumpPumpLowIcon from '../../../resources/panelIcons/SumpPumpLowIcon.png';
import SumpPumpMediumLowIcon from '../../../resources/panelIcons/SumpPumpMediumLowIcon.png';
import SumpPumpMediumHighIcon from '../../../resources/panelIcons/SumpPumpMediumHighIcon.png';
import SumpPumpHighIcon from '../../../resources/panelIcons/SumpPumpHighIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import { Context } from '../../../state/Store';
import './BasementPanel.scss';


export default function BasementPanel() {
    const [open, setOpen] = useState(false);
    const [state,] = useContext(Context);

    const getSumpIcon = () => {
        if (state.sumpData.warningLevel === 0) {
            return <img alt="sump pump low" className="sump-icon" src={SumpPumpLowIcon} />
        } else if (state.sumpData.warningLevel === 1) {
            return <img alt="sump pump medium low" className="sump-icon" src={SumpPumpMediumLowIcon} />
        } else if (state.sumpData.warningLevel === 2) {
            return <img alt="sump pump medium high" className="sump-icon" src={SumpPumpMediumHighIcon} />
        } else if (state.sumpData.warningLevel === 3) {
            return <img alt="sump pump high" className="sump-icon" src={SumpPumpHighIcon} />
        }
    }

    return (
        <div>
            <Accordion className="basement-panel">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => { setOpen(!open) }}>
                    <div className="summary">
                        <img alt="basement" className="logo-image" src={BasementIcon} />
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
                </AccordionSummary>
                <Divider />
                <AccordionDetails className="center">
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
                </AccordionDetails>
            </Accordion>
        </div >
    );
}