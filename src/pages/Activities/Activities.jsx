import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../state/Store';
import Header from '../../components/header/Header';
import AddIcon from '@mui/icons-material/Add';
import LightActivity from './LightActivity';
import HvacActivity from './HvacActivity';
import CreateNewActivityPanel from './CreateNewActivity';
import { getScheduledTasks } from '../../utilities/RestApi';
import { useAuth0 } from '@auth0/auth0-react';
import './Activities.scss';


export default function ActivitiesPage() {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [addTask, setAddTask] = useState(false)

    useEffect(() => {
        dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Activities' });
        const fetchActivities = async () => {
            const token = await auth0.getAccessTokenSilently();
            const activities = await getScheduledTasks(token);
            dispatch({ type: 'SET_SCHEDULED_TASK', payload: activities.tasks || [] });
        };
        fetchActivities();
    }, [dispatch]);

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
            <div>
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
                        <button type="button" className="add-task-button" aria-label="Add task" onClick={createNewTask}>
                            <AddIcon className="add-task-button-plus" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}