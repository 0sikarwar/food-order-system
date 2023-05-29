import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Button from './Button';

const CartFooter = ({ itemCount, typeCount, onBtnClick, btnText }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pos="fixed"
      bottom="0"
      left="0"
      w="100%"
      bgColor="#fff"
      padding="10px"
      boxShadow="inner"
      zIndex="3"
    >
      <Flex direction="column">
        <Heading size="sm">Total items in Cart: {itemCount}</Heading>
        <Text fontSize="12px">Food item types: {typeCount}</Text>
      </Flex>
      <Button variants="secondary" onClick={onBtnClick}>
        {btnText}
      </Button>
    </Flex>
  );
};

export default CartFooter;
