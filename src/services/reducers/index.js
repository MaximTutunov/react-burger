import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { constructorReducer } from "./constructor";

export const initialState = {
  data: [],
  constructorData: {
    bun: null,
    filling: [],
  },
  currentIngredientDetails: {
    image: null,
    name: null,
    calories: null,
    proteins: null,
    fat: null,
    carbohydrates: null,
  },
  isModalOpen: false,
  dataRequest: false,
  dataFailed: false,
  orderNumRequest: false,
  orderNumFailed: false,
  currentIngredient: {},
  order: null,
  totalPrice: 0,
};

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  details: modalReducer,
  assembled: constructorReducer,
});
