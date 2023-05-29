import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function MobileSpinner({ val, onChange }) {
  const [value, setValue] = useState(0);
  function handleChange(value) {
    setValue(value);
    onChange && onChange(value);
  }

  useEffect(() => {
    setValue(val);
  }, [val]);

  return (
    <Flex
      w="95px"
      pos="relative"
      h="30px"
      border="1px solid #e0dede"
      borderRadius="5px"
      value={value}
    >
      <NumberInput
        defaultValue={0}
        max={99}
        min={0}
        clampValueOnBlur={false}
        onChange={handleChange}
        value={value}
      >
        <NumberInputField p="5px" w="40%" h="100%" border="0" outline="none" />
        <NumberInputStepper pos="unset">
          <NumberIncrementStepper
            children="+"
            pos="absolute"
            left={0}
            top="0"
            width="30px"
            fontSize="18px"
            h="100%"
            border="0"
            outline="none"
          />
          <NumberDecrementStepper
            children="-"
            pos="absolute"
            right={0}
            top="0"
            width="30px"
            fontSize="18px"
            h="100%"
            border="0"
            outline="none"
          />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
}

export default MobileSpinner;
