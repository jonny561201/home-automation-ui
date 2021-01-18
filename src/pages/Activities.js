import React, { useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';
import Header from '../components/header/Header';
import { getStore } from '../state/GlobalState';
import LightAlarm from '../components/panels/LightAlarmPanel';
import { getScheduledTasks } from '../utilities/RestApi';
import './Activities.css';


export default function ActivitiesPage() {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        const getData = async () => {
            const responseTasks = await getScheduledTasks(getStore().getUserId());
            setTasks(responseTasks);
        };
        getData();
    }, []);

    return (
        <div>
            <div className="activities-header">
                <Header />
            </div>
            <div className="settings-group settings-text">
                <h2>Light Alarm</h2>
            </div>
            <Divider />
            {
                tasks.map(x => {
                    return <LightAlarm groupName={x.alarm_group_name} lightDays={x.alarm_days} lightTime={x.alarm_time} />
                })
            }
        </div>
    )
}