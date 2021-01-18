import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../state/Store';
import { Divider } from '@material-ui/core';
import { getScheduledTask } from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';

export default function LightAlarm() {
    const [state, dispatch] = useContext(Context);
    const [lightDays, setLightDays] = useState();
    const [lightTime, setLightTime] = useState();
    const [groupName, setGroupName] = useState();
    const [lightGroupId, setLightGroupId] = useState();
    const [userId,] = useState(getStore().getUserId());

    useEffect(() => {
        const getData = async () => {
            const response = await getScheduledTask(userId);
            setLightDays(response[0].alarm_days);
            setLightGroupId(response[0].alarm_light_group)
            setLightTime(response[0].alarm_time);
            setGroupName(response[0].alarm_group_name);
            if (response && response[0].alarm_days) {
                state.daysOfWeek.filter(x => response[0].alarm_days.includes(x.id)).map(y =>
                    dispatch({ type: 'TOGGLE_DAY_OF_WEEK', payload: { ...y, on: true } })
                )
            }
        };
        getData();
    }, [userId]);

    return (
        <>
            <div className="settings-group settings-text">
                <h2>Light Alarm</h2>
            </div>
            <Divider />
            <div className="settings-row">
                <p className="settings-text measure-unit">Alarm Room:</p>
                <p className="settings-text measure-unit">{groupName}</p>
            </div>
            <div className="settings-row">
                <p className="settings-text measure-unit">Alarm Days:</p>
                <p className="settings-text measure-unit">{lightDays}</p>
            </div>
            <div className="settings-row">
                <p className="settings-text measure-unit">Alarm Time:</p>
                <p className="settings-text measure-unit">{lightTime}</p>
            </div>
        </>
    )
}