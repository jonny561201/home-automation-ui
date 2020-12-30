import React, { useContext, useEffect, useState } from 'react';
import { updateGarageState } from '../../utilities/RestApi';
import { useInterval } from '../../utilities/UseInterval';
import { Context } from '../../state/Store';
import { calculateDistanceInMeters } from '../../utilities/Location';

export default function UserLocation() {
    const [state, dispatch] = useContext(Context);
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);

    useEffect(() => {
        calculateDistance();
    }, []);

    //TODO: may not need this with watch position
    useInterval(() => {
        calculateDistance();
    }, 5000);

    const shouldOpenGarage = (distance) => {
        //within 100M of Garage
        //then within 50M of Garage within 10s
        //then within 20M of Garage within 20s

        //if garage door already in garage shouldnt open
        //time duration to reset location checks

        // not in garage
        if (distance >= 0.1 && distance < 0.4) {
            if (distance <= 0.4 && !firstCheck && !secondCheck) {
                setFirstCheck(true);
                return false;
            } else if (distance <= 0.3 && firstCheck && !secondCheck) {
                setSecondCheck(true);
                return false;
            } else if (distance <= 0.2 && secondCheck && firstCheck) {
                return true;
            } else {
                setFirstCheck(false);
                setSecondCheck(false);
                return false;
            }
        } 
    }

    const calculateDistance = () => {
        navigator.geolocation.getCurrentPosition((position) => {
        // navigator.geolocation.watchPosition((position) => {
            const userCoords = position.coords;
            dispatch({ type: "SET_USER_COORDS", payload: userCoords });
            if (state.garageCoords !== null) {
                const garageCoords = state.garageCoords;
                const userDistance = calculateDistanceInMeters(garageCoords.latitude, garageCoords.longitude, userCoords.latitude, userCoords.longitude);
                if (shouldOpenGarage(userDistance)) {
                    console.log('gonna open')
                    updateGarageState(true, state.userId, 1);
                }
            }
        }, (error) => { alert('Enable GPS position feature.') }, { enableHighAccuracy: true });
    }

    return (
        <></>
    )
}