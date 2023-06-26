import { Divider, Flex, Text } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import MobileSpinner from './MobileSpinner';
import { ItemsContext } from '../context/itemsContext';
import { addItemInCartUrl } from '../utils/apiUrl';
import { useParams } from 'react-router-dom';
import { postCall } from '../utils/api';

const CartCard = ({ item_count, item_id, price_type, item, disabled }) => {
  const { cartItem, updateCart, fullCartData, updateFullCart } =
    useContext(ItemsContext);
  const debouceId = useRef(null);
  const { client_id, table_id } = useParams();
  function addToCart(value) {
    let currentCart = [...(cartItem || [])];
    let found = false;
    for (let i = 0; i < currentCart.length; i++) {
      if (
        currentCart[i].item_id === item_id &&
        currentCart[i].price_type === price_type
      ) {
        if (Number(value) === 0) {
          currentCart[i] = null;
        } else {
          currentCart[i] = { item_id, item_count: value, price_type };
        }
        found = true;
        break;
      }
    }
    if (!found) currentCart.push({ item_id, item_count: value, price_type });
    currentCart = currentCart.filter(Boolean);
    updateCart(currentCart);
    if (debouceId.current) clearTimeout(debouceId.current);
    debouceId.current = setTimeout(
      async () => {
        const res = await postCall(
          { cart: currentCart, client_id, table_id },
          addItemInCartUrl
        );
        updateFullCart(res);
      },
      currentCart?.length ? 500 : 0
    );
  }
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex direction="column" alignItems="flex-start" w="60%">
          <Text fontSize="18px" fontWeight="700">
            {item.name}
          </Text>
          {item.item_desc && (
            <Text fontSize="13px" textAlign="left" mt="0">
              {item.item_desc}
            </Text>
          )}
        </Flex>
        <Flex
          w="38%"
          justifyContent="center"
          alignItems="center"
          direction="column"
          h="100%"
        >
          <Text fontSize="14px" fontWeight="500" mb="5px">
            {price_type === 'half' ? `Half Price` : 'Full Price'}:{' '}
            {(disabled ? `${item_count} X ` : '') + `₹${item[price_type]}`}
          </Text>
          {!disabled && (
            <MobileSpinner val={item_count || 0} onChange={addToCart} />
          )}
        </Flex>
      </Flex>
      <Divider my="20px" />
    </>
  );
};

export default CartCard;
