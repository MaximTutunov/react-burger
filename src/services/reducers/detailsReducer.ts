import {
  CLOSE_INGREDIENT_MODAL,
  TCloseIngredientModalAction,
} from "../actions/detailsAction";
import { TIngredients } from "../types";

type TingredientInitialState = {
  openModal: string | TIngredients | null;
};

const ingredientInitialState = {
  openModal: null,
};

export const detailsReducer = (
  state = ingredientInitialState,
  action: TCloseIngredientModalAction
): TingredientInitialState => {
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
