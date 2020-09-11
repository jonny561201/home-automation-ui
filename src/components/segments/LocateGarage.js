import React from 'react';
import { Divider } from '@material-ui/core';

export default function LocateGarage() {
    return (
        <div>
            <h2>Set Garage Location</h2>
            <Divider />
            <p data-testid="locate-garage-paragraph">To locate your garage; please stand in the center of the garage and click the 'Add' button</p>
        </div>
    )
}