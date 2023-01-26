import {
  ADD_BUN,
  ADD_INGREDIENT_CONSTRUCTOR,
  RESET_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  TConstructorActions,
} from "../actions/constructorAction";
import { TIngredients } from "../types";

type TConstructorInitialState = {
  itemsId: string[];
  items: TIngredients[];
  bun: TIngredients;
};

const initialState: TConstructorInitialState = {
  itemsId: [],
  items: [],
  bun: {
    type: "bun",
    name: "",
    price: 0,
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    proteins: 0,
    id: "",
    _id: "",
    __v: 0,
    count: 0,
    image: "",
    image_large: "",
    image_mobile: "",
    length: 0,
  },
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorInitialState => {
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
        itemsId: [...state.itemsId, action.data._id],
      };
    }
    case ADD_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        items: [...state.items, action.data],
        itemsId: [...state.itemsId, action.data._id],
      };
    }
    case RESET_INGREDIENT: {
      return {
        ...state,
        items: [],
        bun: initialState.bun,
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
