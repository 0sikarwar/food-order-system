import { Flex, Input, useNumberInput } from '@chakra-ui/react';
import { useState } from 'react';
import Button from './Button';

function MobileSpinner({ id, type, addToCart }) {
  const [prevValue, setPrevValue] = useState('0');
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 0,
      min: 0,
      max: 99,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  function handleChange() {
    if (prevValue !== input.value) {
      setPrevValue(input.value);
      addToCart({ item_id: id, item_count: input.value, price_type: type });
    }
  }

  return (
    <Flex w="95px">
      <Button
        {...inc}
        px="5px"
        minWidth="30px"
        h="30px"
        borderRightRadius="0"
        onClick={handleChange}
      >
        +
      </Button>
      <Input {...input} px="5px" h="30px" borderRadius="0" borderX="0" />
      <Button
        {...dec}
        px="5px"
        minWidth="30px"
        h="30px"
        borderLeftRadius="0"
        onClick={handleChange}
      >
        -
      </Button>
    </Flex>
  );
}

export default MobileSpinner;
