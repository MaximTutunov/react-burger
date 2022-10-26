import { getOrderDetailsData } from "../../utils/Api";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILED = "ORDER_DETAILS_FAILED";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export function getOrderDetails(order) {
  return function (dispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    getOrderDetailsData(order)
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          number: res.order.number,
        });
      })
      .catch(() => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
}

export function closeOrderModal() {
  return {
    type: CLOSE_ORDER_MODAL,
  };
}
