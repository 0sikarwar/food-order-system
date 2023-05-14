import React, { useContext, useEffect } from 'react';
import { ChakraProvider, Box, useToast } from '@chakra-ui/react';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './themeStyles/theme';
import Layout from './components/Layout';
import { ToastContext } from './context/toastContext';
import './styles/global.css';

function App() {
  const { toastObj } = useContext(ToastContext);
  const toast = useToast();
  useEffect(() => {
    if (toastObj.msg)
      toast({
        title: toastObj.msg,
        status: toastObj.type,
        duration: toastObj.duration || 3000,
        position: 'top-right',
        isClosable: true,
      });
  }, [toastObj]);
  useEffect(() => {
    console.log('app deployed');
  }, []);
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Box minH="100vh" p={3}>
            <Layout>
              <Router />
            </Layout>
          </Box>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
