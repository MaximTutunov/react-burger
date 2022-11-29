import { TFeedResponse } from "../types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_SEND_ORDERS: "WS_SEND_ORDERS" = "WS_SEND_ORDERS";

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetOrders
  | IWsSendOrders;

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  payload: TFeedResponse;
}
interface IWsSendOrders {
  readonly type: typeof WS_SEND_ORDERS;
  payload: TFeedResponse;
}

export const wsConnectionOpen = (): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
  };
};
export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (order: TFeedResponse): IWsGetOrders => {
  return {
    type: WS_GET_ORDERS,
    payload: order,
  };
};

export const wsSendMessage = (order: TFeedResponse): IWsSendOrders => {
  return {
    type: WS_SEND_ORDERS,
    payload: order,
  };
};
