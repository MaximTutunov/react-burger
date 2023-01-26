import { TFeedResponse } from "../types";

export const WS_AUTH_CONNECTION_START: "WS_AUTH_CONNECTION_START" =
  "WS_AUTH_CONNECTION_START";
export const WS_AUTH_CONNECTION_SUCCESS: "WS_AUTH_CONNECTION_SUCCESS" =
  "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR: "WS_AUTH_CONNECTION_ERROR" =
  "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_CLOSED: "WS_AUTH_CONNECTION_CLOSED" =
  "WS_AUTH_CONNECTION_CLOSED";
export const WS_AUTH_GET_ORDERS: "WS_AUTH_GET_ORDERS" = "WS_AUTH_GET_ORDERS";
export const WS_AUTH_SEND_ORDERS: "WS_AUTH_SEND_ORDERS" = "WS_AUTH_SEND_ORDERS";
export const WS_AUTH_USER_NAME_UPDATE: "WS_AUTH_USER_NAME_UPDATE" =
  "WS_AUTH_USER_NAME_UPDATE";

export type TWsAuthActions =
  | IWsAuthConnectionStart
  | IWsAuthConnectionSuccess
  | IWsAuthConnectionError
  | IWsAuthConnectionClosed
  | IWsAuthGetOrders
  | IWsAuthUserSendOrders;

interface IWsAuthConnectionStart {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}
interface IWsAuthConnectionSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}
interface IWsAuthConnectionError {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}
interface IWsAuthConnectionClosed {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}
interface IWsAuthGetOrders {
  readonly type: typeof WS_AUTH_GET_ORDERS;
  payload: TFeedResponse;
}
interface IWsAuthUserSendOrders {
  readonly type: typeof WS_AUTH_SEND_ORDERS;
  payload: TFeedResponse;
}

export const wsAuthConnectionOpen = (): IWsAuthConnectionStart => {
  return {
    type: WS_AUTH_CONNECTION_START,
  };
};
export const wsAuthConnectionSuccess = (): IWsAuthConnectionSuccess => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS,
  };
};

export const wsAuthConnectionError = (): IWsAuthConnectionError => {
  return {
    type: WS_AUTH_CONNECTION_ERROR,
  };
};

export const wsAuthConnectionClosed = (): IWsAuthConnectionClosed => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED,
  };
};

export const wsAuthGetMessage = (order: TFeedResponse): IWsAuthGetOrders => {
  return {
    type: WS_AUTH_GET_ORDERS,
    payload: order,
  };
};

export const wsAuthSendMessage = (
  order: TFeedResponse
): IWsAuthUserSendOrders => {
  return {
    type: WS_AUTH_SEND_ORDERS,
    payload: order,
  };
};
