import React, { useContext } from 'react';
import { Context } from '../../state/Store';
import './AccountIcon.scss';


export default function Account(props) {
    const [state,] = useContext(Context);
    const firstInitial = state.user.firstName.trim().charAt(0);
    const lastInitial = state.user.lastName.trim().charAt(0);

    const handleClick = () => {
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