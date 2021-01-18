import React from 'react';
import { Divider } from '@material-ui/core';


export default function LightAlarm(props) {

    return (
        <>
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
            <Divider className="alarm-time-divider"/>
        </>
    )
}