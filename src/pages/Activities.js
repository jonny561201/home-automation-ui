import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { getStore } from '../state/GlobalState';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LightAlarm from '../components/panels/LightAlarmPanel';
import { getScheduledTasks, insertScheduledTasks } from '../utilities/RestApi';
import LightAlarmEditPanel from '../components/panels/LightAlarmCreatePanel';
import './Activities.css';


export default function ActivitiesPage() {
    getStore().setActivePage('Activities');
    const [tasks, setTasks] = useState([]);
    const [addTask, setAddTask] = useState(false)


    useEffect(() => {
        const getData = async () => {
            const responseTasks = await getScheduledTasks(getStore().getUserId());
            setTasks(responseTasks);
        };
        getData();
    }, []);

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(x => x.task_id !== taskId));
    }

    const addNewTask = () => {
        setAddTask(true);
    }

    const saveNewTask = async (task) => {
        const response = await insertScheduledTasks(getStore().getUserId(), task.alarmLightGroup, task.alarmGroupName, task.alarmDays, task.alarmTime);
        setTasks([...response])
        setAddTask(false);
    }

    return (
        <div>
            <div className="activities-header">
                <Header />
            </div>
            {/* {
                state.roles.some(x => x.role_name === 'lighting') && */}
            <div className="activities-body">
                <div className="activites-wrapper">
                    <div className="settings-group settings-text">
                        <h2>Light Alarm</h2>
                    </div>
                    {
                        addTask &&
                        <LightAlarmEditPanel saveNewTask={saveNewTask} cancelNewTask={() => {setAddTask(false)}} />
                    }
                    {
                        tasks.map(x => {
                            return <LightAlarm key={`${x.alarm_group_name}-${x.alarm_days}-${x.alarm_time}`} task={x} deleteTask={deleteTask} />
                        })
                    }
                </div>
                <div className="add-task-container">
                    <AddCircleIcon data-testid="add-task-button" className="add-task-button" onClick={addNewTask} />
                </div>
            </div>
            {/* } */}
        </div>
    )
}