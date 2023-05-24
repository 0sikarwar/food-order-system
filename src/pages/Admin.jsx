import { Box, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '../components/Button';
import RenderAddClientFields from '../components/RenderAddClientFields';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const handleSectionChange = section => {
    setActiveSection(section);
  };
  const handleViewClient = async () => {
    navigate(`/view-clients`);
  };
  return (
    <Box>
      <ButtonGroup gap="4">
        <Button
          variant="primary"
          onClick={() => handleSectionChange('fields')}
          isDisabled={activeSection === 'fields'}
        >
          Add client
        </Button>
        <Button variant="secondary" onClick={handleViewClient}>
          View All Clients
        </Button>
      </ButtonGroup>
      {activeSection === 'fields' && (
        <RenderAddClientFields handleSectionChange={handleSectionChange} />
      )}
    </Box>
  );
};

export default Admin;
