import React from 'react';

const initialState = {
  toastObj: { msg: '', type: 'success' },
};

const actions = {
  SHOW_TOAST: 'SHOW_TOAST',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SHOW_TOAST:
      return { toastObj: action.obj };
    default:
      return state;
  }
};

export const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    toastObj: state.toastObj,
    showToast: obj => {
      dispatch({ type: actions.SHOW_TOAST, obj });
    },
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
