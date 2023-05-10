import { extendTheme } from '@chakra-ui/react';
// import { formStyles as Form } from './formStyles';
import { buttonStyles as Button } from './buttonStyles';

export function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export const themeColors = {
  primary: '#2C3333',
  secondary: '#478468',
  higlight: '#ACD572',
  warning: '#F9F871',
  danger: '#8A1E00',
};

export const textColor = {
  primary: '#000',
  secondary: '#fff',
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

export const theme = extendTheme({
  colors: themeColors,
  breakpoints,
  components: {
    // Form,
    Button,
  },
});
