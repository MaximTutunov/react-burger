import { getCookie } from "../../utils/cookie";
import { TWSMiddleWareActions } from "../types";
import { Middleware, MiddlewareAPI } from "redux";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWSMiddleWareActions,
  isAuth: boolean = false
): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: null | WebSocket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const accessToken = getCookie("token");
      if (type === wsInit) {
        if (!isAuth) {
          socket = new WebSocket(wsUrl);
        } else {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
        if (type === wsSendMessage) {
          const orders = { ...payload };
          socket.send(JSON.stringify(orders));
        }
      }
      next(action);
    };
  };
};
