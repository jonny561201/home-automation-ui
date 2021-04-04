import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../state/Store';
import useSound from 'use-sound';
import clickSound from '../resources/singleClick.mp3';
import Header from '../components/header/Header';
import { getStore } from '../state/GlobalState';
import AddIcon from '@material-ui/icons/Add';
import LightActivity from './Activities/LightActivity';
import HvacActivity from '../pages/Activities/HvacActivity';
import { getScheduledTasks } from '../utilities/RestApi';
import CreateNewActivityPanel from './Activities/CreateNewActivity';
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

    const createActivities = (task) => {
        return task.task_type === 'hvac'
        ? <HvacActivity key={task.task_id} task={task}/>
        : <LightActivity key={task.task_id} task={task} />
    }

    return (
        <div>
            <div className="activities-header">
                <Header />
            </div>
            <div className="activities-body body">
                <div className="activites-wrapper">
                    <div className="settings-group setting panel-header-text">
                        <h2 data-testid="activities-sub-header">Activities</h2>
                    </div>
                    {
                        addTask &&
                        <CreateNewActivityPanel saveNewTask={() => {setAddTask(false)}} cancelNewTask={() => { setAddTask(false) }} />
                    }
                    {
                        state.tasks.map(x => createActivities(x))
                    }
                </div>
                <div className="add-task-container">
                    <div className="add-task-button-border">
                        <div className="add-task-button success-ripple">
                        <AddIcon data-testid="add-task-button" className="add-task-button-plus" onClick={createNewTask} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}