import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ variant, children, ...rest }) => {
  return (
    <ChakraButton variant={variant} {...rest}>
      {children}
    </ChakraButton>
  );
};

export default Button;
