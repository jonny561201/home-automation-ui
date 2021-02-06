import React from 'react';
import './AccountIcon.css';
import useSound from 'use-sound';
import singleClickSound from '../../resources/singleClick.mp3';
import { getStore } from '../../state/GlobalState';


export default function Account(props) {
    const [click] = useSound(singleClickSound, {volume: 0.5});
    const firstInitial = getStore().getFirstName().trim().charAt(0);
    const lastInitial = getStore().getLastName().trim().charAt(0);

    const handleClick = () => {
        click();
        props.toggle();
    }

    return (
        <div className="account-container" onClick={handleClick} >
            <div data-testid={"account-border"} className="account-border">
                <div data-testid={"account-center"} className="account-center">
                    <p data-testid={"user-initials"}>{firstInitial + lastInitial}</p>
                </div>
            </div>
        </div>
    );
}