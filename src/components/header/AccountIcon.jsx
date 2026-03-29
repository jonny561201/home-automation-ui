import React, { useContext } from 'react';
import { Context } from '../../state/Store';
import './AccountIcon.css';
import useSound from 'use-sound';
import singleClickSound from '../../resources/singleClick.mp3';


export default function Account(props) {
    const [state,] = useContext(Context);
    const [click] = useSound(singleClickSound, { volume: 0.25 });
    const firstInitial = state.user.firstName.trim().charAt(0);
    const lastInitial = state.user.lastName.trim().charAt(0);

    const handleClick = () => {
        click();
        props.toggle();
    }

    return (
        <div className="account-container" onClick={handleClick} >
            <div className="account-border">
                <div className="account-center header-text ripple">
                    <p>{firstInitial + lastInitial}</p>
                </div>
            </div>
        </div>
    );
}