import uuid from "react-uuid";
import { getData, apiOrder } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_ORDERNUM_REQUEST = "GET_ORDERNUM_REQUEST";
export const GET_ORDERNUM_SUCCESS = "GET_ORDERNUM_SUCCESS";
export const GET_ORDERNUM_FAILED = "GET_ORDERNUM_FAILED";

export const CURRENT_INGREDIENT_OPENED = "CURRENT_INGREDIENT_OPENED";
export const CURRENT_INGREDIENT_CLOSED = "CURRENT_INGREDIENT_CLOSED";
export const GET_TOTALPRICE = "GET_TOTALPRICE";
export const COUNT_INCREMENT = "COUNT_INCREMENT";
export const COUNT_DECREMENT = "COUNT_DECREMENT";

export const ADD_ITEM = "ADD_ITEM";
export const ADD_BUN = "ADD_BUN";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEMS = "UPDATE_ITEMS";

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getData().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
          bun: {},
          filling: [],
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    });
  };
};

export const getOrderNum = (orderData) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDERNUM_REQUEST,
    });
    apiOrder(orderData).then((res) => {
      if (res) {
        dispatch({
          type: GET_ORDERNUM_SUCCESS,
          orderNum: res.order.number,
        });
      } else {
        dispatch({
          type: GET_ORDERNUM_FAILED,
        });
      }
    });
  };
};

export const openCurrentIngredient = (props) => {
  return function (dispatch) {
    dispatch({
      type: CURRENT_INGREDIENT_OPENED,
      payload: props,
    });
  };
};
export const closeCurrentIngredient = (props) => {
  return function (dispatch) {
    dispatch({
      type: CURRENT_INGREDIENT_CLOSED,
      payload: props,
    });
  };
};

export const getTotalPrice = (bun, content) => {
  let total = 0 + bun.price * 2;
  total = content.reduce((acc, obj) => {
    return acc + obj.price;
  }, total);
  return function (dispatch) {
    dispatch({
      type: GET_TOTALPRICE,
      totalPrice: total,
    });
  };
};

export const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    item: item,
  };
};

export const onDropHandler = (item) => {
  return function (dispatch) {
    if (item.type !== "bun" && item.dragged === undefined) {
      dispatch({
        type: ADD_ITEM,
        item,
        key: uuid(),
      });
    } else {
      dispatch({
        type: ADD_BUN,
        item,
      });
    }
  };
};
