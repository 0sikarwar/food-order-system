import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCall } from '../utils/api';
import { getClientUrl } from '../utils/apiUrl';
import { ToastContext } from '../context/toastContext';
import { Box, Flex, Heading } from '@chakra-ui/react';
import QrCodeCard from '../components/QrCodeCard';
import Loader from '../components/Loader';

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

  return (
    <Box>
      {clientData ? (
        <>
          <Heading>
            QR code for {clientData.reg_table_count} registered table of{' '}
            {clientData.name}
          </Heading>
          <Flex wrap={'wrap'}>
            {new Array(clientData.reg_table_count).fill(0).map((_, index) => (
              <QrCodeCard table={index} key={index} clientId={clientData.id} />
            ))}
          </Flex>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default ViewQr;
