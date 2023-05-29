import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../context/itemsContext';
import { getCartDataUrl, placeOrderUrl, viewItemsUrl } from '../utils/apiUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { getCall, postCall } from '../utils/api';
import { ToastContext } from '../context/toastContext';
import Loader from '../components/Loader';
import CartCard from '../components/CartCard';
import CartFooter from '../components/CartFooter';
import { Box, Collapse, Flex, Image, useDisclosure } from '@chakra-ui/react';
import dropdownArrow from '../assets/images/dropdownArrow.svg';

const Cart = () => {
  const {
    itemList,
    setItemList,
    cartItem,
    totalCartItem,
    updateCart,
    fullCartData,
    updateFullCart,
  } = useContext(ItemsContext);
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [groupedData, setGroupedData] = useState(null);
  const { client_id, table_id } = useParams();
  const { isOpen: isOrderedOpen, onToggle: onOrderedToggle } = useDisclosure();
  const navigate = useNavigate();
  async function getCartData() {
    let url = getCartDataUrl.replace('<cid>', client_id);
    url = url.replace('<tid>', table_id);
    const res = fullCartData || (await getCall(url));
    if (res.status === 'SUCCESS' && !res.list.length) {
      showToast({
        msg: 'No item in cart',
        type: 'warn',
      });
      navigate(`/${client_id}/orderitem/${table_id}`);
    }
    updateFullCart(res);
  }

  async function handlePlaceOrder() {
    setLoading(true);
    const res = await postCall(
      { cart: cartItem, client_id, table_id },
      placeOrderUrl
    );
    updateFullCart(res);
    setLoading(false);
    if (res.status === 'SUCCESS') {
      showToast({
        msg: 'Order Placed',
        type: 'success',
      });
      navigate(`/${client_id}/orderitem/${table_id}`);
    }
  }

  async function getItems() {
    const res = itemList || (await getCall(viewItemsUrl + client_id));
    if (!itemList) setItemList(res);
    if (res.status === 'SUCCESS') {
      if (!res.list.length) {
        showToast({
          msg: 'No item found',
          type: 'warning',
        });
      }
    } else {
      showToast({
        msg: 'Something went wrong please try again',
        type: 'error',
      });
    }
  }

  useEffect(() => {
    setLoading(true);
    getItems();
    getCartData();
  }, []);

  useEffect(() => {
    if (itemList?.list?.length && fullCartData?.list?.length) {
      const tempCartItems = [];
      const temp = fullCartData.list.reduce(
        (result, cartItem) => {
          const currentItem = itemList.list.find(
            item => item.id === cartItem.item_id
          );
          if (cartItem.status === 'cart') {
            tempCartItems.push({
              ...cartItem,
              create_date: undefined,
              update_date: undefined,
            });
            result.cartItems.push({ ...cartItem, item: currentItem });
          } else {
            result.orderedItems.push({ ...cartItem, item: currentItem });
          }
          return result;
        },
        { cartItems: [], orderedItems: [] }
      );
      console.log('temp', temp);
      updateCart(tempCartItems);
      setGroupedData(temp);
      setLoading(false);
    }
  }, [fullCartData, itemList]);

  return loading || !groupedData ? (
    <Loader />
  ) : (
    <Box pb="35px">
      <Flex
        width="100vw"
        left="0"
        ml="-12px"
        zIndex={2}
        bgColor="#cfe4ea"
        overflow="visible"
        px="10px"
        mb="20px"
        fontSize="14px"
        minH="30px"
        alignItems="center"
        fontWeight="700"
      >
        Cart items
      </Flex>
      {groupedData.cartItems.map((obj, index) => (
        <CartCard key={index} {...obj} />
      ))}
      {!!groupedData.orderedItems.length && (
        <>
          <Flex
            width="100vw"
            left="0"
            ml="-12px"
            zIndex={2}
            bgColor="#cfe4ea"
            overflow="visible"
            px="10px"
            mb="20px"
            fontSize="14px"
            minH="30px"
            alignItems="center"
            fontWeight="700"
            justifyContent="space-between"
            onClick={onOrderedToggle}
          >
            Ordered items
            <Image
              src={dropdownArrow}
              alt=""
              width="24px"
              transform={isOrderedOpen ? 'rotate(180deg)' : 'unset'}
            />
          </Flex>
          <Collapse in={isOrderedOpen} animateOpacity>
            <Box>
              {groupedData.orderedItems.map((obj, index) => (
                <CartCard key={index} {...obj} disabled />
              ))}
            </Box>
          </Collapse>
        </>
      )}
      {!!totalCartItem && !!cartItem.length && (
        <CartFooter
          itemCount={totalCartItem}
          typeCount={cartItem.length}
          btnText="Place Order"
          onBtnClick={handlePlaceOrder}
        />
      )}
    </Box>
  );
};

export default Cart;
