import {
  CLOSE_ORDER_INFO_MODAL,
  TCloseOrderInfoModalAction,
} from "../actions/orderInfoModCloseAction";

type TorderInfoInitialState = {
  openModal: null | string;
};
const orderInfoInitialState: TorderInfoInitialState = {
  openModal: null,
};

export const orderInfoReducer = (
  state = orderInfoInitialState,
  action: TCloseOrderInfoModalAction
): TorderInfoInitialState => {
  switch (action.type) {
    case CLOSE_ORDER_INFO_MODAL: {
      return {
        ...state,
        openModal: null,
      };
    }
    default: {
      return state;
    }
  }
};
