import React from 'react';
import { Add, Remove, ChevronRight } from '@material-ui/icons';
import { ButtonBase, IconButton } from "@material-ui/core";
import './Buttons.css';


export function GreenButton(props) {
    return (
        <div className="button-container">
            <ButtonBase type="submit" className={`green my-button ${props.className}`} disabled={props.disabled} onClick={props.onClick}>{props.children}</ButtonBase>
        </div>
    )
}

export function BlueButton(props) {
    return (
        <div className="button-container">
            <ButtonBase type="submit" className={`blue my-button ${props.className}`} disabled={props.disabled} onClick={props.onClick}>{props.children}</ButtonBase>
        </div>
    )
}

export function RedButton(props) {
    return (
        <div className="button-container">
            <ButtonBase type="submit" className={`red my-button ${props.className}`} disabled={props.disabled} onClick={props.onClick}>{props.children}</ButtonBase>
        </div>
    )
}

export function ExpandButton(props) {
    return (
        <IconButton aria-label="expand" className={props.className} onClick={props.onClick}>
            <ChevronRight />
        </IconButton>
    )
}

export function AddButton(props) {
    const [rotate, setRotate] = React.useState(0)
    const myClick = (event) => {
        props.onClick(event);
        setRotate(1);
    }

    return (
        <ButtonBase aria-label="Add" className="button-border" onClick={myClick}>
            <div className="button-item add-item" rotate={rotate} onAnimationEnd={() => setRotate(0)}>
                <Add className="button-icon" />
            </div>
        </ButtonBase>
    )
}

export function RemoveButton(props) {
    const [rotate, setRotate] = React.useState(0)
    const myClick = (event) => {
        props.onClick(event);
        setRotate(1);
    }

    return (
        <ButtonBase aria-label={props['aria-label']} className="button-border" onClick={myClick}>
            <div className="button-item remove-item" rotate={rotate} onAnimationEnd={() => setRotate(0)}>
                <Remove className="button-icon" />
            </div>
        </ButtonBase>
    )
}