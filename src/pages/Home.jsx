import { HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <HStack>
        <Link as={ReactRouterLink} to="/enter-data">
          Enter data
        </Link>
      </HStack>
    </Layout>
  );
};

export default Home;
