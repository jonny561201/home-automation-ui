import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


const createColorSwitch = (checkedColor) => styled(Switch)({
  '& .MuiSwitch-switchBase': {
    color: '#fafafa',
    '&.Mui-checked': {
      color: checkedColor,
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: checkedColor,
    },
  },
});

export const HeatSwitch = createColorSwitch('#db5127');

export const CoolSwitch = createColorSwitch('#27aedb');

export const AutoSwitch = createColorSwitch('#00c774');
