import { HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <HStack>
      <Link as={ReactRouterLink} to="/enter-data">
        Enter data
      </Link>
    </HStack>
  );
};

export default Home;
