import { Box, ButtonGroup } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import Button from '../components/Button';
import RenderAddClientFields from '../components/RenderAddClientFields';
import { getCall } from '../utils/api';
import { getAllClientUrl } from '../utils/apiUrl';
import RenderViewClientTable from '../components/RenderViewClientTable';
import { ToastContext } from '../context/toastContext';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('');
  const [tableData, setTableData] = useState();
  const [loadingClientData, setLoadingClientData] = useState(false);
  const { showToast } = useContext(ToastContext);
  const handleSectionChange = section => {
    setActiveSection(section);
  };
  const handleViewClient = async () => {
    handleSectionChange('clintTable');
    setLoadingClientData(true);
    const res = await getCall(getAllClientUrl);
    if (res.status === 'SUCCESS') setTableData(res.list);
    else {
      showToast({
        msg: 'Something went wrong please try again',
        type: 'error',
      });
      setActiveSection('');
    }
    setLoadingClientData(false);
  };
  return (
    <Box>
      <ButtonGroup gap="4">
        <Button variant="primary" onClick={() => handleSectionChange('fields')}>
          Add client
        </Button>
        <Button
          variant="secondary"
          onClick={handleViewClient}
          isLoading={loadingClientData}
        >
          View Client
        </Button>
      </ButtonGroup>
      {activeSection &&
        (activeSection === 'fields' ? (
          <RenderAddClientFields handleSectionChange={handleSectionChange} />
        ) : (
          tableData && <RenderViewClientTable tableData={tableData} />
        ))}
    </Box>
  );
};

export default Admin;
