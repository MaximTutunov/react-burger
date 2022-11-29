import { CLOSE_INGREDIENT_MODAL } from "../actions/detailsAction";

const ingredientInitialState = {
  openModal: null,
};

export const detailsReducer = (state = ingredientInitialState, action) => {
  switch (action.type) {
    case CLOSE_INGREDIENT_MODAL: {
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
