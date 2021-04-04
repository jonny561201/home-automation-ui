import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { getStore } from '../state/GlobalState';
import { getUserPreferences } from '../utilities/RestApi';
import SettingsPanel from './Settings/SettingsPanel';
import SettingsEditPanel from './Settings/SettingsEditPanel';
import './Settings.css'


export default function Settings() {
    getStore().setActivePage('Settings');
    const [userId,] = useState(getStore().getUserId());
    const [city, setCity] = useState();
    const [tempUnit, setTempUnit] = useState();
    const [isEditMode, setEditMode] = useState();
    const [measureUnit, setMeasureUnit] = useState();

    useEffect(() => {
        const getData = async () => {
            const response = await getUserPreferences(userId);
            setCity(response.city);
            setTempUnit(response.temp_unit);
            setMeasureUnit(response.measure_unit);
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
            <div className="settings-body body">
                {isEditMode
                    ? <SettingsEditPanel
                        city={city} setCity={setCity}
                        tempUnit={tempUnit} setTempUnit={setTempUnit}
                        isEditMode={isEditMode} setEditMode={setEditMode}
                        measureUnit={measureUnit} setMeasureUnit={setMeasureUnit}
                    />
                    : <SettingsPanel
                        city={city}
                        tempUnit={tempUnit}
                        measureUnit={measureUnit}
                        toggleEdit={toggleEditMode}
                    />
                }
            </div>
        </div>
    )
}