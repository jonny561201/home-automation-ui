import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../state/Store';
import useSound from 'use-sound';
import clickSound from '../resources/singleClick.mp3';
import Header from '../components/header/Header';
import { getStore } from '../state/GlobalState';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LightAlarm from '../components/panels/LightAlarmPanel';
import { getScheduledTasks } from '../utilities/RestApi';
import LightAlarmEditPanel from '../components/panels/LightAlarmCreatePanel';
import './Activities.css';


export default function ActivitiesPage() {
    getStore().setActivePage('Activities');
    const [click] = useSound(clickSound, {volume: 0.25});
    const [state, dispatch] = useContext(Context);
    const [addTask, setAddTask] = useState(false)


    useEffect(() => {
        const getData = async () => {
            const responseTasks = await getScheduledTasks(getStore().getUserId());
            dispatch({ type: 'SET_SCHEDULED_TASK', payload: responseTasks });
        };
        getData();
    }, []);

    const createNewTask = () => {
        setAddTask(true);
        click();
    }

    return (
        <div>
            <div className="activities-header">
                <Header />
            </div>
            {/* {
                state.roles.some(x => x.role_name === 'lighting') && */}
            <div className="activities-body body">
                <div className="activites-wrapper">
                    <div className="settings-group settings-text">
                        <h2>Light Alarm</h2>
                    </div>
                    {
                        addTask &&
                        <LightAlarmEditPanel saveNewTask={() => {setAddTask(false)}} cancelNewTask={() => { setAddTask(false) }} />
                    }
                    {
                        state.tasks.map(x => {
                            return <LightAlarm key={`${x.alarm_group_name}-${x.alarm_days}-${x.alarm_time}`} task={x} />
                        })
                    }
                </div>
                <div className="add-task-container">
                    <div className="add-task-button-border">
                        <AddCircleIcon data-testid="add-task-button" className="add-task-button" onClick={createNewTask} />
                    </div>
                </div>
            </div>
            {/* } */}
        </div>
    )
}