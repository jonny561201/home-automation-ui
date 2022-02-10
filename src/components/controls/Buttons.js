import React from 'react';
import { ButtonBase } from "@material-ui/core";
import './Buttons.css';

export function GreenButton(props) {
    return (
        <ButtonBase className="button-container">
            <button className="green-button" disabled={props.disabled} onClick={() => props.onClick()}>{props.children}</button>
        </ButtonBase>
    )
}

export function BlueButton(props) {
    return (
        <ButtonBase className="button-container">
            <button className="blue-button" disabled={props.disabled} onClick={() => props.onClick()}>{props.children}</button>
        </ButtonBase>
    )
}

export function RedButton(props) {
    return (
        <ButtonBase className="button-container">
            <button className="red-button" disabled={props.disabled} onClick={() => props.onClick()}>{props.children}</button>
        </ButtonBase>
    )
}