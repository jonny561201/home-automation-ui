import React from 'react';
import TempPicker from '../controls/TempPicker';
import TimePicker from '../controls/TimePicker';
import WeekPicker from '../controls/WeekPicker';
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Divider, Switch } from '@material-ui/core';


export default function HvacActivityPanel() {
    return (
        <ExpansionPanel className="task-panel" expanded={open} onChange={() => { setOpen(!open) }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className="alarm-summary-panel">
                    <div className="alarm-setting-group" data-testid="light-alarm-group">
                        <div className="settings-row alarm-row">
                            <p className="setting panel-header-text alarm-time">{time.slice(0, -3)}</p>
                        </div>
                        <div className="settings-row alarm-row">
                            <p className="setting text alarm-group-name">{props.task.alarm_group_name}</p>
                        </div>
                    </div>
                    <div className="alarm-setting-group">
                        <div className="settings-row alarm-row">
                            <p className="setting text measure-unit">{days}</p>
                        </div>
                        <div className="settings-row alarm-row">
                            <Switch className="task-switch" onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()}
                                checked={enabled} onChange={toggleTask} color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </div>

                    </div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="center">
                <div>
                    <div className="settings-row">
                        <div className="picker-row">
                            <TimePicker initialTime={startTime} setTime={updateStartTime} label="start time" />
                            <TimePicker initialTime={stopTime} setTime={updateStopTime} label="stop time" />
                        </div>
                    </div>
                    <div className="settings-row">
                        <div className="picker-row">
                            <TempPicker value={inTemp} onChange={setInTemp} label="Start Temp" />
                            <TempPicker value={outTemp} onChange={setOutTemp} label="Stop Temp" />
                        </div>
                    </div>
                    <WeekPicker daysOfWeek={daysOfWeek} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
                    <Divider />
                    <div className="tasks-button-group text">
                        <div className="task-button-container" onClick={clickDelete}>
                            <Delete className="task-button task-delete" />
                            <p className="task-delete">Delete</p>
                        </div>
                        <div className="task-button-container" onClick={saveTask}>
                            <Save className={`task-button ${edited ? "edited" : ""}`} />
                            <p className={edited ? "edited" : ''}>Update</p>
                        </div>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}