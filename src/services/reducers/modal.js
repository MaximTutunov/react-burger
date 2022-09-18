import { initialState } from "./index";
import {
  CURRENT_INGREDIENT_OPENED,
  CURRENT_INGREDIENT_CLOSED,
} from "../actions/index";

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_INGREDIENT_OPENED: {
      return {
        ...state,
        isModalOpen: true,
        currentIngredientDetails: {
          image: action.payload.image,
          name: action.payload.name,
          calories: action.payload.calories,
          proteins: action.payload.proteins,
          fat: action.payload.fat,
          carbohydrates: action.payload.carbohydrates,
        },
      };
    }
    case CURRENT_INGREDIENT_CLOSED: {
      return {
        ...state,
        isModalOpen: false,
        currentIngredientDetails: {
          image: null,
          name: null,
          calories: null,
          proteins: null,
          fat: null,
          carbohydrates: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};
