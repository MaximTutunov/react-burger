import {
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_FAILED,
  TIngredientsActions,
} from "../actions/ingredientsAction";
import { TIngredients } from "../types";

type TIngredientsInitialState = {
  ingredients: Array<TIngredients>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  isLoading: boolean;
  hasError: boolean;
};

const ingredientsInitialState: TIngredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  isLoading: false,
  hasError: false,
};

export const ingredientsReducer = (
  state = ingredientsInitialState,
  action: TIngredientsActions
): TIngredientsInitialState => {
  switch (action.type) {
    case BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: true,
        hasError: false,
        isLoading: true,
      };
    }
    case BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
        isLoading: false,
        hasError: true,
      };
    }
    case BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
