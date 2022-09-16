import { initialState } from "./index";

import { ADD_ITEM, ADD_BUN, DELETE_ITEM, UPDATE_ITEMS } from "../actions/index";

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const ingredientSum =
        state.constructorData.filling.filter(function (item) {
          return item._id === action.item._id;
        }).length + 1;
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          filling: [
            ...state.constructorData.filling.map((item) => ({
              ...item,
            })),
            ...[
              {
                ...action.item,
                key: action.key,
                count: ingredientSum,
              },
            ],
          ],
        },
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          bun: { ...action.item, count: 1 },
        },
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          filling: state.constructorData.filling
            .map((item) =>
              item._id === action.item._id
                ? { ...item, count: item.count - 1 }
                : item
            )
            .filter((item) => item.count > 0),
        },
      };
    }
    case UPDATE_ITEMS: {
      const filling = [...state.constructorData.filling];
      filling.splice(action.toIndex, 0, filling.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          filling: filling,
        },
      };
    }
    default: {
      return state;
    }
  }
};
