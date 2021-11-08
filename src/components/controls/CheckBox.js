import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';


export const GreenCheckbox = withStyles({
    root: {
        color: '#00c774',
        '&$checked': {
            color: '#00c774',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);