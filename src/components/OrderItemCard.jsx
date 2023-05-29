import { Badge, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import MobileSpinner from './MobileSpinner';

const OrderItemCard = ({
  name,
  item_desc,
  half,
  full,
  categories,
  filterByCategory,
  id,
  addToCart,
  cartObj,
}) => {
  function handleSpinnerChange(value, type) {
    addToCart({ item_id: id, item_count: value, price_type: type });
  }
  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Flex direction="column" alignItems="flex-start" w="100%">
        <Flex wrap="wrap" alignItems="center">
          <Text fontSize="18px" fontWeight="700">
            {name}
          </Text>
          {categories.split(',').map((cat, idx) => (
            <Badge
              colorScheme="purple"
              key={idx}
              fontSize="8px"
              borderRadius="10px"
              ml="5px"
              h="12px"
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </Flex>
        {item_desc && (
          <Text fontSize="13px" textAlign="left" mt="0">
            {item_desc}
          </Text>
        )}
      </Flex>
      <Flex w="100%" justifyContent="space-between" mt="8px">
        {!!Number(half) && (
          <Flex width="48%" justifyContent="center" alignItems="center">
            <Text fontSize="14px" fontWeight="500" mr="3px">
              Half: {`₹${half}`}
            </Text>
            {half && (
              <MobileSpinner
                val={cartObj.half || 0}
                onChange={value => handleSpinnerChange(value, 'half')}
              />
            )}
          </Flex>
        )}
        <Flex width="48%" justifyContent="center" alignItems="center">
          <Text fontSize="14px" fontWeight="500" mr="3px">
            {half ? `Full` : 'Price'}: {`₹${full}`}
          </Text>
          <MobileSpinner
            val={cartObj.full || 0}
            onChange={value => handleSpinnerChange(value, 'full')}
          />
        </Flex>
      </Flex>
      <Divider my="20px" />
    </Flex>
  );
};

export default OrderItemCard;
