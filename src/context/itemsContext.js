import React from 'react';

const initialState = {
  cartItem: null,
};

const actions = {
  UPDATE_CART: 'UPDATE_CART',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_CART:
      return { cartItem: action.obj };
    default:
      return state;
  }
};

export const ItemsContext = React.createContext();

export const ItemsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    cartItem: state.cartItem,
    updateCart: obj => {
      dispatch({ type: actions.UPDATE_CART, obj });
    },
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
