import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import CreateLightActivity from './CreateLightActivity';
import CreateHvacActivity from './CreateHvacActivity';
import { Delete } from '@material-ui/icons';
import { ExpansionPanelDetails, ExpansionPanel, TextField, MenuItem, ExpansionPanelSummary } from '@material-ui/core';


export default function CreateNewActivityPanel(props) {
    const [state,] = useContext(Context);
    const [type, setType] = useState('');

    const updateSelectedType = (item) => {
        setType(state.taskTypes.find(x => x === item.target.value));
    }

    const selectedComponents = () => {
        if (type === 'hvac') {
            return <CreateHvacActivity type={type} cancel={props.cancelNewTask} save={props.saveNewTask} />
        } else if (type !== '') {
            return <CreateLightActivity type={type} cancel={props.cancelNewTask} save={props.saveNewTask} />
        } else {
            return (
                <div className="tasks-button-group text">
                    <div className="task-button-container" onClick={() => props.cancelNewTask()}>
                        <Delete className="task-button task-delete" />
                        <p className="task-delete">Cancel</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <ExpansionPanel className="task-panel" expanded={true}>
                <ExpansionPanelSummary style={{ height: "0px", minHeight: "0px" }} />
                <ExpansionPanelDetails className="center">
                    <div className="activity-detail-panel">
                        <div className="settings-row">
                            <TextField data-testid="task-type" className="light-alarm-component task-room-picker-row" select variant="outlined" value={type} onChange={updateSelectedType} label="Task Type">
                                {state.taskTypes.map(x => (
                                    <MenuItem key={x} value={x}>
                                        {x}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        {selectedComponents()}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}