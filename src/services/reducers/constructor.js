import {
  ADD_BUN,
  ADD_INGREDIENT_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  RESET_INGREDIENT,
} from "../actions/constructor";

const initialState = {
  items: [],
  bun: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_INGREDIENT: {
      return {
        ...state,
        items: [...state.items].filter((item) => {
          return item.id !== action.id;
        }),
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.data,
      };
    }
    case ADD_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        items: [...state.items, action.data],
      };
    }
    case RESET_INGREDIENT: {
      return {
        ...state,
        items: [],
        bun: [],
      };
    }
    case MOVE_INGREDIENT: {
      const dragConstructor = [...state.items];
      dragConstructor.splice(
        action.data.dragIndex,
        0,
        dragConstructor.splice(action.data.hoverIndex, 1)[0]
      );

      return {
        ...state,
        items: dragConstructor,
      };
    }
    default: {
      return state;
    }
  }
};
