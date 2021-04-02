import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateLightActivity from '../segments/CreateLightActivity';
import CreateHvacActivity from '../segments/CreateHvacActivity';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';


export default function LightAlarmEditPanel(props) {
    const [state, ] = useContext(Context);
    const [type, setType] = useState('New Activity');
    const [opened, setOpened] = useState(true);

    const updateSelectedType = (item) => {
        setType(state.taskTypes.find(x => x === item.target.value));
    }

    const selectedComponents = () => {
        if (type === 'hvac') {
            return <CreateHvacActivity type={type} cancel={props.cancelNewTask} save={props.saveNewTask}/>
        } else if (type !== 'New Activity') {
            return <CreateLightActivity type={type} cancel={props.cancelNewTask} save={props.saveNewTask}/>
        } else {
            return <></>
        }
    }

    return (
        <>
            <ExpansionPanel className="task-panel" defaultExpanded={opened} expanded={opened} onChange={() => { setOpened(!opened) }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div>
                        <div className="alarm-setting-group" data-testid="light-alarm-group">
                            {
                                !opened &&
                                <div className="settings-row alarm-row">
                                    <p className="setting text alarm-group-name">{type}</p>
                                </div>
                            }
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="center">
                    <div className="settings-row">
                        <FormControl className="light-alarm-component task-room-picker-row" variant="outlined">
                            <InputLabel id="light-group-dropdown">Task Type</InputLabel>
                            <Select
                                value={type}
                                onChange={updateSelectedType}
                                label="Task Type"
                            >
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