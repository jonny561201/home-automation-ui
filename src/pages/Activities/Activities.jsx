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
    const [addTask, setAddTask] = useState(false);
    const [rotated, setRotated] = useState(false);

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
        setRotated(true);
        setTimeout(() => setAddTask(true), 250);
    }

    const getExistingActivities = (task) => {
        return task.taskType === 'hvac'
            ? <HvacActivity key={task.taskId} task={task} />
            : <LightActivity key={task.taskId} task={task} />
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
                    {addTask &&
                        <>
                            <p className="activity-section-label text">New Activity</p>
                            <CreateNewActivityPanel saveNewTask={() => { setAddTask(false); setRotated(false); }} cancelNewTask={() => { setAddTask(false); setRotated(false); }} />
                        </>
                    }
                    {addTask && state.tasks.length > 0 &&
                        <p className="activity-section-label text">Existing</p>
                    }
                    {state.tasks.map(x => getExistingActivities(x))}
                </div>
                <div className="add-task-container">
                    <div className="add-task-button-border">
                        <button type="button" className={"add-task-button" + (rotated ? " rotated" : "")} aria-label="Add task" disabled={addTask} onClick={createNewTask}>
                            <AddIcon className="add-task-button-plus" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}