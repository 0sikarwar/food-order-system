import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCall } from '../utils/api';
import { getClientUrl } from '../utils/apiUrl';
import { ToastContext } from '../context/toastContext';
import { Box, CircularProgress } from '@chakra-ui/react';
import QrCodeCard from '../components/QrCodeCard';

function ViewQr() {
  const { showToast } = useContext(ToastContext);
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const getCurrentClientData = async () => {
    const res = await getCall(getClientUrl + id);
    if (res.status === 'SUCCESS') setClientData(res.data);
    else {
      showToast({
        msg: 'Something went wrong please try again later',
        type: 'error',
      });
    }
  };
  useEffect(() => {
    getCurrentClientData();
  }, []);
  console.log('clientData', clientData);
  return (
    <Box>
      {clientData ? (
        <QrCodeCard />
      ) : (
        <CircularProgress isIndeterminate color="green.300" />
      )}
    </Box>
  );
}

export default ViewQr;
