import React from 'react';
import { withStyles } from '@mui/styles';
import { Checkbox } from '@mui/material';


export const GreenCheckbox = withStyles({
    root: {
        color: '#00c774',
        '&$checked': {
            color: '#00c774',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);