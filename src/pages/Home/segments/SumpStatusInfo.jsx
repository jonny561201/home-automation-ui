import React, { useContext } from 'react';
import { ArrowUpward, ArrowDownward, Remove } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Context } from '../../../state/Store';
import './SumpStatusInfo.scss';


export default function SumpStatusInfo() {
    const [state,] = useContext(Context);

    const getWarningLabel = () => {
        switch (state.sumpData.warningLevel) {
            case 0: return 'Normal';
            case 1: return 'Elevated';
            case 2: return 'High';
            case 3: return 'Critical';
            default: return '';
        }
    };

    const getWarningClass = () => {
        if (state.sumpData.warningLevel <= 1) return 'status-normal';
        if (state.sumpData.warningLevel === 2) return 'status-elevated';
        return 'status-critical';
    };

    const getLastUpdatedText = () => {
        if (!state.sumpData.latestDate) return null;
        const parsed = new Date(state.sumpData.latestDate);
        if (isNaN(parsed.getTime())) return null;
        return formatDistanceToNow(parsed, { addSuffix: true });
    };

    const getTrendIndicator = () => {
        if (state.sumpData.currentDepth == null || state.sumpData.averageDepth == null) return null;
        if (state.sumpData.currentDepth > state.sumpData.averageDepth) {
            return (
                <p className="sump-text text trend-indicator trend-falling">
                    <ArrowDownward className="trend-icon" />
                    <span>Falling</span>
                </p>
            );
        }
        if (state.sumpData.currentDepth < state.sumpData.averageDepth) {
            return (
                <p className="sump-text text trend-indicator trend-rising">
                    <ArrowUpward className="trend-icon" />
                    <span>Rising</span>
                </p>
            );
        }
        return (
            <p className="sump-text text trend-indicator trend-stable">
                <Remove className="trend-icon" />
                <span>Stable</span>
            </p>
        );
    };

    return (
        <div className="sump-status-info">
            <div className="sump-status-row">
                <p className={'sump-text text ' + getWarningClass()}>{getWarningLabel()}</p>
                {getTrendIndicator()}
            </div>
            {getLastUpdatedText() &&
                <p className="sump-last-reading text">{getLastUpdatedText()}</p>
            }
        </div>
    );
}
