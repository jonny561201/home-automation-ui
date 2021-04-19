import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { getStore } from '../../state/GlobalState';
import { getUserPreferences } from '../../utilities/RestApi';
import SettingsPanel from './SettingsPanel';
import SettingsEditPanel from './SettingsEditPanel';
import { HeatSwitch } from '../../components/controls/Switches';
import { FormControlLabel, FormControl } from '@material-ui/core';
import './Settings.css'


export default function Settings() {
    getStore().setActivePage('Settings');
    const [userId,] = useState(getStore().getUserId());
    const [darkMode, setDarkMode] = useState(false);
    const [city, setCity] = useState();
    const [tempUnit, setTempUnit] = useState();
    const [isEditMode, setEditMode] = useState();
    const [measureUnit, setMeasureUnit] = useState();

    useEffect(() => {
        setDarkMode(localStorage.getItem('theme') === 'theme-dark');
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

    const setTheme = (themeName, isDark) =>  {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
        setDarkMode(isDark);
    }

    const toggleDarkMode = () => {
        localStorage.getItem('theme') === 'theme-dark'
        ? setTheme('theme-light', false)
        : setTheme('theme-dark', true)
    }

    return (
        <div>
            <div className="settings-header">
                <Header />
            </div>
            <div className="settings-body body">
                <div className="settings-wrapper body">
                <div className="settings-group setting panel-header-text">
                    <h2>Preferences</h2>
                </div>
                <div className="settings-row text">
                    <FormControl>
                        <FormControlLabel label="Dark Mode" control={<HeatSwitch onChange={toggleDarkMode} checked={darkMode}/>}/>
                    </FormControl>
                </div>
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
        </div>
    )
}