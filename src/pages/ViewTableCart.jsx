import React, { useContext, useEffect, useState } from 'react';
import {
  confirmPaymentUrl,
  getCartDataUrl,
  viewItemsUrl,
} from '../utils/apiUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { getCall, postCall } from '../utils/api';
import { ItemsContext } from '../context/itemsContext';
import { ToastContext } from '../context/toastContext';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import CartCard from '../components/CartCard';
import Loader from '../components/Loader';
import CartFooter from '../components/CartFooter';
import Layout from '../components/Layout';

const ViewTableCart = () => {
  const { client_id, table_id } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    fullCartData,
    updateFullCart,
    itemList,
    setItemList,
    cartItem,
    totalCartItem,
    updateCart,
  } = useContext(ItemsContext);

  const { showToast } = useContext(ToastContext);
  const [groupedData, setGroupedData] = useState(null);
  const navigate = useNavigate();
  async function getCartData() {
    let url = getCartDataUrl.replace('<cid>', client_id);
    url = url.replace('<tid>', table_id);
    const res = fullCartData || (await getCall(url));
    if (!res.list?.length) {
      showToast({
        msg: 'No item found',
        type: 'warning',
      });
      navigate(`/${client_id}/view-tables`);
    }
    updateFullCart(res);
  }

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

  async function handleConfirm() {
    const flag = window.confirm(
      `Are you sure you want to mark table ${
        Number(table_id) + 1
      } PAYMENT DONE `
    );
    if (flag) {
      const res = await postCall({ client_id, table_id }, confirmPaymentUrl);
      if (res.status === 'SUCCESS') {
        showToast({
          msg: `Table ${Number(table_id) + 1} Marked as free now`,
          type: 'success',
        });
        navigate(`/${client_id}/view-tables`);
      }
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <Layout>
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
      >
        Ordered items
        {fullCartData?.orderAmount && (
          <Text>Total amount: ₹{fullCartData.orderAmount}</Text>
        )}
      </Flex>
      <Box>
        {groupedData?.orderedItems?.map((obj, index) => (
          <CartCard key={index} {...obj} disabled />
        ))}
      </Box>
      {!!fullCartData?.totalOrderedItem &&
        !!groupedData?.orderedItems?.length && (
          <CartFooter
            itemCount={fullCartData.totalOrderedItem}
            typeCount={groupedData.orderedItems.length}
            btnText="Confirm Payment"
            onBtnClick={handleConfirm}
            title="Total items ordered"
          />
        )}
    </Layout>
  );
};

export default ViewTableCart;
