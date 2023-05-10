import { Box, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '../components/Button';
import RenderAddClientFields from '../components/RenderAddClientFields';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('');
  const handleSectionChange = section => {
    setActiveSection(section);
  };
  return (
    <Box>
      <ButtonGroup gap="4">
        <Button variant="primary" onClick={() => handleSectionChange('fields')}>
          Add client
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleSectionChange('table')}
        >
          View Client
        </Button>
      </ButtonGroup>
      {activeSection === 'fields' ? (
        <RenderAddClientFields handleSectionChange={handleSectionChange} />
      ) : null}
    </Box>
  );
};

export default Admin;
