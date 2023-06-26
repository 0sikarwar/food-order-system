import React, { useEffect, useState } from 'react';
import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import searchIcon from '../assets/images/searchIcon.svg';
import useDebounce from '../utils/useDebounce';

const SearchBar = ({ handleChange }) => {
  const [val, setVal] = useState('');
  const handleChangeText = useDebounce(val => handleChange(val), 500, []);
  function onChange(e) {
    setVal(e?.target?.value || '');
    if (!e?.target?.value) handleChangeText.flush();
  }
  useEffect(() => {
    handleChangeText(val);
  }, [val]);

  return (
    <>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={
            <Image
              src={searchIcon}
              w="20px"
              h="20px"
              alt=""
              pos="absolute"
              top="15px"
              left="10px"
              opacity="0.3"
            />
          }
        />
        <Input
          type="text"
          placeholder="Search the Menu"
          border="0"
          height="50px"
          bgColor="#dcdcdc"
          borderRadius={10}
          onChange={onChange}
          value={val}
          outline="none"
          boxShadow="none !important"
        />
        {!!val && (
          <InputRightAddon
            border="none"
            h="50px"
            bgColor="#dcdcdc"
            pr="10px"
            onClick={onChange}
          >
            <Text fontSize="14px" color="blue.700">
              clear
            </Text>
          </InputRightAddon>
        )}
      </InputGroup>
    </>
  );
};

export default SearchBar;
