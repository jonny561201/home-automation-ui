import React from 'react';
import { ButtonBase } from "@material-ui/core";
import './Buttons.css';


export function GreenButton(props) {
    return (
        <div className="button-container">
            <ButtonBase type="submit" className="green my-button" disabled={props.disabled} onClick={() => props.onClick()}>{props.children}</ButtonBase>
        </div>
    )
}

export function BlueButton(props) {
    return (
        <div className="button-container">
            <ButtonBase type="submit" className="blue my-button" disabled={props.disabled} onClick={() => props.onClick()}>{props.children}</ButtonBase>
        </div>
    )
}

export function RedButton(props) {
    return (
        <div className="button-container">
            <ButtonBase type="submit" className="red my-button" disabled={props.disabled} onClick={() => props.onClick()}>{props.children}</ButtonBase>
        </div>
    )
}