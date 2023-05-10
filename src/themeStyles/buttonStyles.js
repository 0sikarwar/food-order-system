import { defineStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { LightenDarkenColor, textColor, themeColors } from './theme';

export const buttonStyles = defineStyleConfig({
  baseStyle: {},
  variants: {
    primary: props => ({
      bg: 'primary',
      color: textColor.secondary,
      _hover: {
        bg: mode(
          //darken
          LightenDarkenColor(themeColors.primary, -20),
          //whiten
          LightenDarkenColor(themeColors.primary, 20)
        )(props),
        boxShadow: 'md',
      },
    }),
    secondary: props => ({
      bg: 'secondary',
      color: textColor.secondary,
      _hover: {
        bg: mode(
          //darken
          LightenDarkenColor(themeColors.secondary, -20),
          //whiten
          LightenDarkenColor(themeColors.secondary, 20)
        )(props),
        boxShadow: 'md',
      },
    }),
  },
});
