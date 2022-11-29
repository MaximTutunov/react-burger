import {
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_ORDERS,
    TWsAuthActions
  } from "../actions/wsAuthAction";
import { TFeed } from "../types";
  
  type TinitialState = {
    wsConnected: boolean,
    orders: TFeed[],
    total: number,
    totalToday: number,
    wsError: boolean
  };
 
  const initialState:TinitialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    wsError: false
  };
  
  export const wsAuthReducer = (state = initialState, action:TWsAuthActions):TinitialState => {
    switch (action.type) {
      case WS_AUTH_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,
          wsError: false
        };
      case WS_AUTH_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          wsError: false
        };
  
      case WS_AUTH_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          wsError: true
        };
  
      case WS_AUTH_GET_ORDERS:
        return {
          ...state,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };
      default:
        return state;
    }
  };
  