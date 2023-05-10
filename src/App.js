import React, { useContext, useEffect } from 'react';
import { ChakraProvider, Box, Grid, useToast } from '@chakra-ui/react';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './themeStyles/theme';
import Layout from './components/Layout';
import { ToastContext } from './context/toastContext';

function App() {
  const { toastObj } = useContext(ToastContext);
  const toast = useToast();
  useEffect(() => {
    if (toastObj.msg)
      toast({
        title: toastObj.msg,
        status: toastObj.type,
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
  }, [toastObj]);
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <Layout>
              <Router />
            </Layout>
          </Grid>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
