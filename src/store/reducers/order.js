import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseStart = (state) => {
  return updateObject(state, {
    loading: true
  });
};

const purchaseInit = (state) => {
  return updateObject(state, {
    purchased: false
  });
};

const purchaseSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.orderId
  });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const fetchOrders = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const fetchOrdersFail = (state) => {
  return updateObject(state, {
    loading: false
  });
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state); 
    case actionTypes.PURCHASE_INIT: return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state, action);
    case actionTypes.FETCH_ORDERS_START: return fetchOrders(state);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
    default: return state;
  }
};
