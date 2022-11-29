import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  CLOSE_ORDER_MODAL,
  TOrderActions  
  } from "../actions/orderAction";
  
  type TOrderInitialState = {
    orderDetailsFailed: boolean,
    number: null|number,
    orderDetailsRequest: boolean,
  };

  const orderInitialState:TOrderInitialState = {
    orderDetailsFailed: false,
    number: null,
    orderDetailsRequest: false,
  };
  
  export const orderReducer = (state = orderInitialState, action:TOrderActions):TOrderInitialState => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST: {
        return {
          ...state,
          orderDetailsFailed: false,
          orderDetailsRequest: true,
        };
      }
      case ORDER_DETAILS_FAILED: {
        return {
          ...state,
          orderDetailsFailed: true,
          orderDetailsRequest: false,
        };
      }
      case ORDER_DETAILS_SUCCESS: {
        return {
          ...state,
          number: action.number,
          orderDetailsRequest: false,
          orderDetailsFailed: false,
        };
      }
      case CLOSE_ORDER_MODAL: {
        return {
          ...state,
          number: null,
        };
      }
      default: {
        return state;
      }
    }
  };
  