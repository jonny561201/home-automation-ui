import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import CreateLightActivity from './CreateLightActivity';
import CreateHvacActivity from './CreateHvacActivity';
import { Delete } from '@mui/icons-material';
import { AccordionDetails, Accordion, TextField, MenuItem, AccordionSummary, Button } from '@mui/material';


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
                    <Button className="task-delete" onClick={props.cancelNewTask} startIcon={<Delete/>}>Cancel</Button>
                </div>
            )
        }
    }

    return (
        <>
            <Accordion className="task-panel" expanded={true}>
                <AccordionSummary style={{ height: "0px", minHeight: "0px" }} />
                <AccordionDetails className="center">
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
                </AccordionDetails>
            </Accordion>
        </>
    )
}