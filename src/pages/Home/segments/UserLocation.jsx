import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../state/Store';
import CloseIcon from '@mui/icons-material/Close';
import { updateGarageState } from '../../../utilities/RestApi';
import { useInterval } from '../../../utilities/UseInterval';
import { calculateDistanceInMeters } from '../../../utilities/Location';
import './UserLocation.scss';
import { RedButton } from '../../../components/controls/Buttons';
import {useAuth0} from "@auth0/auth0-react";

export default function UserLocation() {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [cancel, setCancel] = useState(false);
    const [opened, setOpened] = useState(false);
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    useEffect(() => {
        calculateDistance();
    }, []);

    //TODO: may not need this with watch position
    useInterval(() => {
        if(state.location.granted)
            calculateDistance();
    }, 5000);

    const cancelDoorOpen = () => {
        setCancel(true);
        setDisplayMenu(false);
    }

    const shouldOpenGarage = (distance) => {
        // DISTANCE COMES IN AS MILES!!!
        // not in garage
        if (distance >= 0.02 && distance < 0.35) {
            if (distance > 0.1 && distance <= 0.3 && !firstCheck && !secondCheck) {
                setFirstCheck(true);
                return false;
            } else if (distance > 0.06 && distance <= 0.1 && firstCheck && !secondCheck) {
                setSecondCheck(true);
                setDisplayMenu(true);
                return false;
            } else if (distance <= 0.04 && secondCheck && firstCheck && !cancel && !opened) {
                setDisplayMenu(false);
                setOpened(true);
                return true;
            }
        } else {
            setFirstCheck(false);
            setSecondCheck(false);
            setDisplayMenu(false);
            setCancel(false);
            setOpened(false)
            return false;
        }
    }

    const calculateDistance = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            // navigator.geolocation.watchPosition((position) => {
            dispatch({ type: 'SET_LOCATION', payload: { granted: true, notified: state.location.notified } });
            const userCoords = position.coords;
            dispatch({ type: "SET_USER_COORDS", payload: userCoords });
            if (state.garageCoords !== null) {
                const garageCoords = state.garageCoords;
                const userDistance = calculateDistanceInMeters(garageCoords.latitude, garageCoords.longitude, userCoords.latitude, userCoords.longitude);
                if (shouldOpenGarage(userDistance)) {
                    console.log('gonna open')
                    const token = await auth0.getAccessTokenSilently();
                    updateGarageState(token, true, state.preferences.garage_id);
                }
            }
        }, () => {
            if (!state.location.notified) {
                alert('Enable GPS position feature.');
                dispatch({ type: "SET_LOCATION", payload: { notified: true, granted: false } });
            }
        }, { enableHighAccuracy: true });
    }

    return (
        <div>
            {
                displayMenu &&
                <div className="auto-open-menu">
                    <CloseIcon className="location-close-icon" onClick={() => setDisplayMenu(false)} />
                    <div className="location-menu-group">
                        <p className="auto-open-text text reduce-margin">Garage will open in 250ft</p>
                        <RedButton className="auto-open-button" onClick={cancelDoorOpen}>Cancel</RedButton>
                    </div>
                </div>
            }
        </div>
    )
}