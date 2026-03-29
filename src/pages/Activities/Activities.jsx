import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import Header from '../../components/header/Header';
import { getStore } from '../../state/GlobalState';
import AddIcon from '@mui/icons-material/Add';
import LightActivity from './LightActivity';
import HvacActivity from './HvacActivity';
import CreateNewActivityPanel from './CreateNewActivity';
import './Activities.css';


export default function ActivitiesPage() {
    getStore().setActivePage('Activities');
    const [state,] = useContext(Context);
    const [addTask, setAddTask] = useState(false)

    const createNewTask = () => {
        setAddTask(true);
    }

    const createActivities = (task) => {
        return task.task_type === 'hvac'
            ? <HvacActivity key={task.task_id} task={task} />
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
                        <h2>Activities</h2>
                    </div>
                    {
                        addTask &&
                        <CreateNewActivityPanel saveNewTask={() => { setAddTask(false) }} cancelNewTask={() => { setAddTask(false) }} />
                    }
                    {
                        state.tasks.map(x => createActivities(x))
                    }
                </div>
                <div className="add-task-container">
                    <div className="add-task-button-border">
                        <button type="button" className="add-task-button success-ripple" aria-label="Add task" onClick={createNewTask}>
                            <AddIcon className="add-task-button-plus" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}