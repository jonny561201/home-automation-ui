import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../state/Store';
import Header from '../components/header/Header';
import { getStore } from '../state/GlobalState';
import { getUserPreferences } from '../utilities/RestApi';
import SettingsPanel from '../components/panels/SettingsPanel';
import SettingsEditPanel from '../components/panels/SettingsEditPanel';
import './Settings.css'


export default function Settings() {
    const [state, dispatch] = useContext(Context);
    getStore().setActivePage('Settings');
    const [userId,] = useState(getStore().getUserId());
    const [city, setCity] = useState();
    const [tempUnit, setTempUnit] = useState();
    const [isEditMode, setEditMode] = useState();
    const [lightDays, setLightDays] = useState();
    const [lightGroupId, setLightGroupId] = useState();
    const [lightTime, setLightTime] = useState();
    const [groupName, setGroupName] = useState();
    const [measureUnit, setMeasureUnit] = useState();

    useEffect(() => {
        const getData = async () => {
            const response = await getUserPreferences(userId);
            setCity(response.city);
            setTempUnit(response.temp_unit);
            setMeasureUnit(response.measure_unit);
            setLightDays(response.light_alarm.alarm_days);
            setLightGroupId(response.light_alarm.alarm_light_group)
            setLightTime(response.light_alarm.alarm_time);
            setGroupName(response.light_alarm.alarm_group_name);

            state.daysOfWeek.filter(x => response.light_alarm.alarm_days.includes(x.id)).map(y =>
                dispatch({ type: 'TOGGLE_DAY_OF_WEEK', payload: { ...y, on: true } })
            )
        };
        getData();
    }, [userId]);

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    }

    return (
        <div>
            <div className="settings-header">
                <Header />
            </div>
            <div className="settings-body">
                {isEditMode
                    ? <SettingsEditPanel
                        city={city} setCity={setCity}
                        tempUnit={tempUnit} setTempUnit={setTempUnit}
                        isEditMode={isEditMode} setEditMode={setEditMode}
                        measureUnit={measureUnit} setMeasureUnit={setMeasureUnit}
                        time={lightTime}
                        groupName={groupName}
                        groupId={lightGroupId} />
                    : <SettingsPanel
                        city={city}
                        tempUnit={tempUnit}
                        measureUnit={measureUnit}
                        toggleEdit={toggleEditMode}
                        days={lightDays}
                        time={lightTime}
                        groupName={groupName} />
                }
            </div>
        </div>
    )
}