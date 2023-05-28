import React, { useContext, useEffect, useRef, useState } from 'react';
import { ToastContext } from '../context/toastContext';
import { useParams } from 'react-router-dom';
import { addItemInCartUrl, viewItemsUrl } from '../utils/apiUrl';
import { getCall, postCall } from '../utils/api';
import { Box, Flex } from '@chakra-ui/react';
import Loader from '../components/Loader';
import OrderItemCard from '../components/OrderItemCard';
import CustomDropdown from '../components/CustomDropdown';
import { snakeToCamel } from '../utils';
import { ItemsContext } from '../context/itemsContext';

const OrderItem = () => {
  const { showToast } = useContext(ToastContext);
  const { client_id, table_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const actualList = useRef(null);
  const [itemsData, setItemsData] = useState(null);
  const [itemByCategories, setItemByCategories] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState(null);
  const debouceId = useRef(null);
  const { cartItem, updateCart } = useContext(ItemsContext);

  function getAllCat(list) {
    if (list?.length) {
      const temp1 = [];
      const temp = list.reduce((res, item) => {
        const cat = item.categories.split(',')[0];
        if (!res[cat]) {
          res[cat] = [item];
        } else {
          res[cat].push(item);
        }
        item.categories.split(',').forEach(cat => {
          const flag = temp1.some(obj => obj.selector === cat);
          if (!flag) {
            temp1.push({ name: snakeToCamel(cat), selector: cat });
          }
        });
        return res;
      }, {});
      console.log('list', list);
      setCategoryList(temp1);
      setItemByCategories(temp);
    }
  }
  async function getItems() {
    const res = await getCall(viewItemsUrl + client_id);
    if (res.status === 'SUCCESS') {
      getAllCat(res.list);
      setItemsData(res.list);
      actualList.current = res.list;
      if (res.list.length) {
        setIsLoading(false);
      } else {
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

  function filterByCategory(catName) {
    const list = [...actualList.current];
    const filteredList = list.filter(item =>
      item.categories.split(',').includes(catName)
    );
    setItemsData(filteredList);
  }
  useEffect(() => {
    getItems();
  }, []);

  function handleCatDropdownChange(obj) {
    setSelectedCategory(obj);
  }

  function addToCart(currentItem) {
    const currentCart = [...(cartItem || [])];
    console.log('currentCart', currentCart);
    let found = false;
    for (let i = 0; i < currentCart.length; i++) {
      if (
        currentCart[i].item_id === currentItem.item_id &&
        currentCart[i].price_type === currentItem.price_type
      ) {
        currentCart[i] = { ...currentItem };
        found = true;
        break;
      }
    }
    if (!found) currentCart.push({ ...currentItem });
    updateCart(currentCart);
    if (debouceId.current) clearTimeout(debouceId.current);
    debouceId.current = setTimeout(async () => {
      const res = await postCall(
        { cart: currentCart, client_id, table_id },
        addItemInCartUrl
      );
    }, 1000);
  }
  console.log('cartItem', cartItem);
  return isLoading ? (
    <Loader />
  ) : (
    <Box>
      {categoryList?.length && (
        <Box pos="fixed" zIndex={3}>
          <Box pos="sticky" top="60px" zIndex={3}>
            <CustomDropdown
              options={categoryList}
              selected={selectedCategory}
              onSelect={handleCatDropdownChange}
              placeholder="Select Category"
              width="150px"
            />
          </Box>
        </Box>
      )}
      {Object.keys(itemByCategories).map((cat, idx) => {
        return !selectedCategory?.selector ||
          cat === selectedCategory.selector ? (
          <>
            <Flex
              position="sticky"
              top="60px"
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
            >
              {snakeToCamel(cat)}
            </Flex>
            {itemByCategories[cat].map((item, index) => {
              return (
                <OrderItemCard
                  key={'' + idx + index}
                  {...item}
                  filterByCategory={filterByCategory}
                  addToCart={addToCart}
                />
              );
            })}
          </>
        ) : null;
      })}
    </Box>
  );
};

export default OrderItem;
