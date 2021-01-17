import React from 'react';
import './AccountIcon.css';
import { getStore } from '../../state/GlobalState';


export default function Account(props) {
    const firstInitial = getStore().getFirstName().trim().charAt(0);
    const lastInitial = getStore().getLastName().trim().charAt(0);

    return (
        <div className="account-container" onClick={props.toggle} >
            <div data-testid={"account-border"} className="account-border">
                <div data-testid={"account-center"} className="account-center">
                    <p data-testid={"user-initials"}>{firstInitial + lastInitial}</p>
                </div>
            </div>
        </div>
    );
}