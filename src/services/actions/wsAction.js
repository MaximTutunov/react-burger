export const WS_CONNECTION_START ='WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_ORDERS = 'WS_SEND_ORDERS';
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';

export const wsConnectionSuccess = () => {
    return {
        type:  WS_CONNECTION_SUCCESS
    }
}

export const wsConnectionOpen = () => {
	return {
		type: WS_CONNECTION_START
	}
}

export const wsConnectionError = () => {
	return {
		type: WS_CONNECTION_ERROR
	};
};

export const wsConnectionClosed = () => {
	return {
		type: WS_CONNECTION_CLOSED
	};
};

export const wsGetMessage = (order) => {
	return {
		type: WS_GET_ORDERS,
		payload: order
	};
};

export const wsSendMessage = (order) => {
	return {
		type: WS_SEND_ORDERS,
		payload: order
	};
};