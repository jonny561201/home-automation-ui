import React from 'react';
import { Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';


export const GreenCheckbox = styled((props) => <Checkbox color="default" {...props} />)({
    color: '#00c774',
    '&.Mui-checked': {
        color: '#00c774',
    },
});
