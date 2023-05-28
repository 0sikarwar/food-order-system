import {
  Box,
  Checkbox,
  Flex,
  ListItem,
  UnorderedList,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import dropdownArrow from '../assets/images/dropdownArrow.svg';

const MultiSelectDropdown = ({
  options,
  selected,
  onSelect,
  setSelectedCols,
  placeholder,
  isMulti,
  width,
  fromTop,
}) => {
  let selecteOption = '';
  if (!isMulti && selected) {
    options.forEach(item => {
      if (item.selector === selected.selector) {
        selecteOption = item.name;
      }
    });
  }
  return (
    <Box
      pos="relative"
      w="100px"
      marginRight="20px"
      style={width ? { width } : {}}
      role="group"
      left="220px"
    >
      <Flex
        border="solid 1px #eee"
        fontSize="12px"
        padding="5px"
        justifyContent="space-between"
        alignItems="center"
        bgColor="#fff"
      >
        <Box width="100%">
          {selected?.length ? (
            <>
              {isMulti ? `${selected.length} selected` : selecteOption}
              {isMulti && setSelectedCols && (
                <Box
                  as="span"
                  onClick={() => setSelectedCols([])}
                  fontWeight="700"
                  paddingLeft="5px"
                  cursor="pointer"
                  color="#a7a7a7"
                >
                  X
                </Box>
              )}
            </>
          ) : (
            <Flex justifyContent="space-between" width="100%">
              {selected?.name || placeholder}
              <Image src={dropdownArrow} alt="" width="10px" />
            </Flex>
          )}
        </Box>
      </Flex>
      <UnorderedList
        display="none"
        position="absolute"
        boxSizing="border-box"
        left="0"
        width="100%"
        border="solid 1px #eee"
        padding="5px 0px"
        margin="0"
        bgColor="#fff"
        bottom={fromTop ? '100%' : 'unset'}
        _groupHover={{
          display: 'block',
          maxHeight: '250px',
          overflowY: 'scroll',
        }}
      >
        {!isMulti && placeholder && (
          <ListItem
            onClick={() => onSelect(null)}
            display="flex"
            alignItems="center"
            padding="6px 10px"
            cursor="pointer"
            fontSize="12px"
            bgColor="#fff"
            _hover={{ bgColor: '#eee' }}
          >
            <span>{placeholder}</span>
          </ListItem>
        )}
        {options.map((option, index) => {
          const isSelected =
            selected?.length &&
            selected.filter(item => item.selector === option.selector).length >
              0;

          return (
            <ListItem
              onClick={() => onSelect(option)}
              key={index}
              display="flex"
              alignItems="center"
              padding="6px 10px"
              cursor="pointer"
              fontSize="12px"
              bgColor="#fff"
              _hover={{ bgColor: '#eee' }}
            >
              {isMulti && (
                <Checkbox checked={isSelected} marginRight="6px" readOnly />
              )}
              <span>{option.name}</span>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};
export default MultiSelectDropdown;
