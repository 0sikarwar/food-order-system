import { Box } from '@chakra-ui/react';
import React from 'react';
import WithSubnavigation from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <WithSubnavigation />
      </div>
      <Box as="main" mt={'150px'}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
