import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { getStore } from '../state/GlobalState';
import { getUserPreferences } from '../utilities/RestApi';
import SettingsPanel from '../components/panels/SettingsPanel';
import SettingsEditPanel from '../components/panels/SettingsEditPanel';
import './Settings.css'


export default function Settings() {
    getStore().setActivePage('Settings');
    const [userId,] = useState(getStore().getUserId());
    const [city, setCity] = useState();
    const [tempUnit, setTempUnit] = useState();
    const [isEditMode, setEditMode] = useState();
    const [lightDays, setLightDays] = useState();
    const [lightTime, setLightTime] = useState();
    const [lightGroup, setLightGroup] = useState();
    const [measureUnit, setMeasureUnit] = useState();

    useEffect(() => {
        const getData = async () => {
            const response = await getUserPreferences(userId);
            setCity(response.city);
            setTempUnit(response.temp_unit);
            setLightDays(response.alarmDays);
            setLightTime(response.alarmTime);
            setMeasureUnit(response.measure_unit);
            setLightGroup(response.alarmLightGroup);
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
                        measureUnit={measureUnit} setMeasureUnit={setMeasureUnit} />
                    : <SettingsPanel
                        city={city}
                        tempUnit={tempUnit}
                        measureUnit={measureUnit}
                        toggleEdit={toggleEditMode}
                        room={lightGroup}
                        days={lightDays}
                        time={lightTime} />
                }
            </div>
        </div>
    )
}