import React from 'react';
import './LogoHeader.css';
import Logo from '../../resources/CompanyLogo.png';

export default function LogoHeader() {
    return (
        <div>
            <div className="white-header">
                <div className="logo-background">
                    <img alt="Logo" className="logo-image" src={Logo} />
                </div>
            </div>
        </div>
    );
}