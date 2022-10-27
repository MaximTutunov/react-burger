import {
    CLOSE_INGREDIENT_MODAL,
    OPEN_INGREDIENT_MODAL
  } from "../actions/detailsAction";
  
  const ingredientInitialState = {
    openModal: null
  };
  
  export const detailsReducer = (state = ingredientInitialState, action) => {
    switch (action.type) {
      case OPEN_INGREDIENT_MODAL: {
        return {
          ...state,
          openModal: action.ingredient
        };
      }
      case CLOSE_INGREDIENT_MODAL: {
        return {
          ...state,
          openModal: null
        };
      }
      default: {
        return state;
      }
    }
  };
  