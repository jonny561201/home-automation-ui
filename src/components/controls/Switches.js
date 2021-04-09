import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';


export const HeatSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    '&$checked': {
      color: "#db5127",
    },
    '&$checked + $track': {
      backgroundColor: "#db5127",
    },
  },
  checked: {},
  track: {},
})(Switch);

export const CoolSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    '&$checked': {
      color: "#27aedb",
    },
    '&$checked + $track': {
      backgroundColor: "#27aedb",
    },
  },
  checked: {},
  track: {},
})(Switch);

export const AutoSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    '&$checked': {
      color: "#00c774",
    },
    '&$checked + $track': {
      backgroundColor: "#00c774",
    },
  },
  checked: {},
  track: {},
})(Switch);