import * as types from 'app-constants/ActionConstants';

export const setCustomer = customer => ({
  type: types.SET_CUSTOMER,
  customer: customer,
});

export const getCustomer = customer => ({
  type: types.GET_CUSTOMER,
  customer: customer,
});

export const removeCustomer = customer => ({
  type: types.REMOVE_CUSTOMER,
  customer: customer,
});

export const checkoutData = data => ({
  type: types.CHECKOUT_DATA,
  data: data,
});

export const lineItemData = data => ({
  type: types.REMOVE_CUSTOMER,
  data: data,
});
