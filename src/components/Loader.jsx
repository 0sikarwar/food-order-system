import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  CircularProgress,
  Flex,
} from '@chakra-ui/react';
const Loader = () => {
  return (
    <Modal isOpen isCentered>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent bg="transparent" shadow="none" display="flex">
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default Loader;
