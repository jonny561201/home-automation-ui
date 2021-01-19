import React from 'react';
import { Divider } from '@material-ui/core';


export default function SettingsPanel(props) {

    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await getScheduledTasks(getStore().getUserId());
    //         setTasks(response);
    //         // setLightDays(response[0].alarm_days);
    //         // setLightGroupId(response[0].alarm_light_group)
    //         // setLightTime(response[0].alarm_time);
    //         // setGroupName(response[0].alarm_group_name);
    //         // if (response && response[0].alarm_days) {
    //         //     state.daysOfWeek.filter(x => response[0].alarm_days.includes(x.id)).map(y =>
    //         //         dispatch({ type: 'TOGGLE_DAY_OF_WEEK', payload: { ...y, on: true } })
    //         //     )
    //         // }
    //     };
    //     getData();
    // }, []);

    return (
        <>
            <div className="settings-wrapper">
                <div className="settings-group settings-text">
                    <h2>Temperature</h2>
                </div>
                <Divider />
                <div className="settings-row">
                    <p className="settings-text temp-unit">Unit:</p>
                    <p className="settings-text temp-unit">{props.tempUnit}</p>
                </div>
                <div className="settings-row">
                    <p className="settings-text temp-city">City:</p>
                    <p className="settings-text temp-city">{props.city}</p>
                </div>
                <div className="settings-text settings-text">
                    <h2>Measurement</h2>
                </div>
                <Divider />
                <div className="settings-row">
                    <p className="settings-text measure-unit">Unit:</p>
                    <p className="settings-text measure-unit">{props.measureUnit}</p>
                </div>
            </div>
            <div>
                <button onClick={props.toggleEdit}>Edit</button>
            </div>
        </>
    );
}