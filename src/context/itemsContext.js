import React from 'react';
import { getCall } from '../utils/api';
import { viewItemsUrl } from '../utils/apiUrl';

const initialState = {
  cartItem: null,
  fullCartData: null,
  listLoading: false,
  itemList: null,
  totalCartItem: null,
};

const actions = {
  GET_ITEM_LIST: 'GET_ITEM_LIST',
  SET_ITEM_LIST: 'SET_ITEM_LIST',
  UPDATE_CART: 'UPDATE_CART',
  UPDATE_FULL_CART: 'UPDATE_FULL_CART',
  UPDATE_LIST_LOADING: 'UPDATE_LIST_LOADING',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_CART:
      return { ...state, cartItem: action.obj, totalCartItem: action.count };
    case actions.UPDATE_FULL_CART:
      return { ...state, fullCartData: action.obj };
    case actions.SET_ITEM_LIST:
      return { ...state, itemList: action.obj };
    case actions.UPDATE_LIST_LOADING:
      return { ...state, listLoading: action.obj };
    default:
      return state;
  }
};

export const ItemsContext = React.createContext();

export const ItemsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    cartItem: state.cartItem,
    fullCartData: state.fullCartData,
    itemList: state.itemList,
    totalCartItem: state.totalCartItem,
    getItemsList: async client_id => {
      dispatch({ type: actions.UPDATE_LIST_LOADING, obj: true });
      const res = await getCall(viewItemsUrl + client_id);
      if (res.status === 'SUCCESS') {
        dispatch({ type: actions.SET_ITEM_LIST, obj: res });
      }
      dispatch({ type: actions.UPDATE_LIST_LOADING, obj: false });
    },
    setItemList: obj => {
      dispatch({ type: actions.SET_ITEM_LIST, obj });
    },
    updateCart: obj => {
      let count = 0;
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          count += Number(obj[i].item_count);
          if (Number(obj[i].item_count) === 0) {
            obj[i] = null;
          }
        }
        obj = obj.filter(Boolean);
      }
      dispatch({ type: actions.UPDATE_CART, obj, count });
    },
    updateFullCart: obj => {
      dispatch({ type: actions.UPDATE_FULL_CART, obj });
    },
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
