import React from 'react';
import './LogoHeader.css';
import Logo from '../../resources/CompanyLogo.png';

export default function LogoHeader() {
    return (
        <div>
            <div data-testid={"white-header"} className="white-header">
                <div data-testid={"logo-background"} className="logo-background">
                    <img alt="Logo" className="logo-image" src={Logo} />
                </div>
            </div>
        </div>
    );
}