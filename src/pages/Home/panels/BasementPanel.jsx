import React, { useContext, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import BasementIcon from '../../../resources/panelIcons/BasementIcon.png';
import SumpPumpLowIcon from '../../../resources/panelIcons/SumpPumpLowIcon.png';
import SumpPumpMediumLowIcon from '../../../resources/panelIcons/SumpPumpMediumLowIcon.png';
import SumpPumpMediumHighIcon from '../../../resources/panelIcons/SumpPumpMediumHighIcon.png';
import SumpPumpHighIcon from '../../../resources/panelIcons/SumpPumpHighIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import { Context } from '../../../state/Store';
import DeviceRegistration from '../segments/DeviceRegistration';
import SumpStatusInfo from '../segments/SumpStatusInfo';
import SumpDepthChart from '../segments/SumpDepthChart';
import './BasementPanel.scss';


export default function BasementPanel() {
    const [open, setOpen] = useState(false);
    const [state,] = useContext(Context);
    const devicesToRegister = (state.devices || []).filter(x => !x.registered && x.type === 'sump_pump');
    const currentDepth = state.sumpData.currentDepth != null ? state.sumpData.currentDepth.toFixed(1) : '--';
    const averageDepth = state.sumpData.averageDepth != null ? state.sumpData.averageDepth.toFixed(1) : '--';

    const getSummaryTrendIcon = () => {
        if (state.sumpData.currentDepth == null || state.sumpData.averageDepth == null) return null;
        if (state.sumpData.currentDepth < state.sumpData.averageDepth) {
            return <ArrowUpward className="summary-trend-icon trend-rising" />;
        }
        if (state.sumpData.currentDepth > state.sumpData.averageDepth) {
            return <ArrowDownward className="summary-trend-icon trend-falling" />;
        }
        return null;
    };

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
                            {!open && devicesToRegister.length > 0 &&
                                <div className="small-text-group">
                                    <p className="small-text text alert">Registration Needed</p>
                                </div>
                            }
                            {!open && devicesToRegister.length === 0 &&
                                <div className="small-text-group">
                                    <p className="small-text text">Depth:</p>
                                    <p className={"small-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{currentDepth}</p>
                                    <p className={"small-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.depthUnit}</p>
                                    {getSummaryTrendIcon()}
                                </div>
                            }
                        </div>
                    </div>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className="center">
                    {devicesToRegister.length > 0
                        ? <DeviceRegistration device={devicesToRegister[0]}/>
                        : <div className="sump-details">
                            <div className="sump-group">
                                {getSumpIcon()}
                                <div className="sump-measure-group">
                                    <div className="sump-text-group">
                                        <p className="sump-text text">Current: </p>
                                        <p className={"sump-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{currentDepth}</p>
                                        <p className={"sump-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.depthUnit}</p>
                                    </div>
                                    <div className="sump-text-group">
                                        <p className="sump-text text">Average: </p>
                                        <p className="sump-text text">{averageDepth}</p>
                                        <p className="sump-text text">{state.sumpData.depthUnit}</p>
                                    </div>
                                    <SumpStatusInfo />
                                </div>
                            </div>
                            <Divider />
                            <SumpDepthChart />
                        </div>
                    }
                </AccordionDetails>
            </Accordion>
        </div >
    );
}