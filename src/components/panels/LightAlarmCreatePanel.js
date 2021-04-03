import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import CreateLightActivity from '../segments/CreateLightActivity';
import CreateHvacActivity from '../segments/CreateHvacActivity';
import { Delete } from '@material-ui/icons';
import { ExpansionPanelDetails, ExpansionPanel, FormControl, MenuItem, Select, InputLabel, ExpansionPanelSummary } from '@material-ui/core';


export default function LightAlarmEditPanel(props) {
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
                <ExpansionPanelSummary style={{ height: "0px", minHeight: "0px"}}/>
                <ExpansionPanelDetails className="center">
                    <div className="settings-row">
                        <FormControl className="light-alarm-component task-room-picker-row" variant="outlined">
                            <InputLabel for="light-group-dropdown">Task Type</InputLabel>
                            <Select id="light-group-dropdown" value={type} onChange={updateSelectedType} label="Task Type" >
                                {state.taskTypes.map(x => (
                                    <MenuItem key={x} value={x}>
                                        {x}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {selectedComponents()}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}