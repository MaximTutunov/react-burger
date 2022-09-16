import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ORDERNUM_REQUEST,
  GET_ORDERNUM_SUCCESS,
  GET_ORDERNUM_FAILED,
  GET_TOTALPRICE,
} from "../actions/index";
import { initialState } from "./index";

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        dataRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        constructorData: {
          ...state.constructorData,
          bun: action.bun,
          filling: action.filling,
        },
        dataFailed: false,

        dataRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        dataFailed: true,
        dataRequest: false,
      };
    }
    case GET_ORDERNUM_REQUEST: {
      return {
        ...state,
        orderNumRequest: true,
      };
    }
    case GET_ORDERNUM_SUCCESS: {
      return {
        ...state,

        order: action.orderNum,
        orderNumRequest: false,
        orderNumFailed: false,
      };
    }
    case GET_ORDERNUM_FAILED: {
      return {
        ...state,
        orderNumRequest: false,
        orderNumFailed: true,
        currentIngredient: {},
      };
    }
    case GET_TOTALPRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice,
      };
    }
    default: {
      return state;
    }
  }
};
