import React from 'react';
import './Account.css';
import { getStore } from '../../GlobalState';


export default function Account(props) {
    const firstInitial = getStore().getFirstName().charAt(0);
    const lastInitial = getStore().getLastName().charAt(0);

    return (
        <div className="account-container" onClick={props.toggle} >
            <div className="account-border">
                <div className="account-center">
                    {/* <div className="user-head"></div>
                    <div className="user-shoulders"></div> */}
                    <p>{firstInitial + lastInitial}</p>
                </div>
            </div>
        </div>
    );
}