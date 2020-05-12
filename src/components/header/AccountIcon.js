import React from 'react';
import './AccountIcon.css';
import { getStore } from '../../state/GlobalState';


export default function Account(props) {
    const firstInitial = getStore().getFirstName().trim().charAt(0);
    const lastInitial = getStore().getLastName().trim().charAt(0);

    return (
        <div className="account-container" onClick={props.toggle} >
            <div className="account-border">
                <div className="account-center">
                    <p data-testid={"user-initials"}>{firstInitial + lastInitial}</p>
                </div>
            </div>
        </div>
    );
}