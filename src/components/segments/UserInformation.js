import React, { useContext, useEffect, useState } from 'react';
import { useInterval } from '../../utilities/UseInterval';
import { Context } from '../../state/Store';
import { calculateDistanceInMeters } from '../../utilities/Location';

export default function UserLocation() {
    const [state, dispatch] = useContext(Context);
    const [distance, setDistance] = useState();
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [inGarage, setInGarage] = useState(false);

    useEffect(() => {
        calculateDistance();
    });

    useInterval(() => {
        calculateDistance();
    }, 5000);

    const shouldOpenGarage = () => {
        //within 100M of Garage
        //then within 50M of Garage within 10s
        //then within 20M of Garage within 20s

        //if garage door already in garage shouldnt open
        //time duration to reset location checks
        if (distance <= 5 && !firstCheck) {
            setInGarage(true);
        } else if (distance <= 15 && secondCheck && firstCheck && !inGarage) {
            setInGarage(true);
            return true;
        } else if (distance <= 50 && firstCheck && !inGarage) {
            setSecondCheck(true);
            return false;
        } else if (distance <= 100 && !inGarage) {
            setFirstCheck(true);
            return false;
        } else {
            setInGarage(false);
            setFirstCheck(false);
            setSecondCheck(false);
            return false;
        }
    }

    const calculateDistance = () => {
        if (state.garageCoords !== null) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = position.coords;
                const currentCoords = state.garageCoords;
                const userDistance = calculateDistanceInMeters(currentCoords.latitude, currentCoords.longitude, coords.latitude, coords.longitude);
                setDistance(userDistance);
                dispatch({ type: "SET_USER_COORDS", payload: userDistance });
            }, (error) => { alert('Enable GPS position feature.') }, { enableHighAccuracy: true });
        }
    }

    return (
        <>
            <p>Distance: {distance} Miles</p>
        </>
    )
}