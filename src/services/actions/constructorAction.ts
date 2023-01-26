import { TIngredients } from "../types";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT_CONSTRUCTOR: "ADD_ITEM_CONSTRUCTOR" =
  "ADD_ITEM_CONSTRUCTOR";
export const RESET_INGREDIENT: "RESET_ITEM" = "RESET_ITEM";
export const MOVE_INGREDIENT: "MOVE_ITEM" = "MOVE_ITEM";
export const DELETE_INGREDIENT: "DELETE_ITEM" = "DELETE_ITEM";

export type TConstructorActions =
  | IAddBun
  | IAddIngredientConstructor
  | IResetIngredient
  | IMoveIngredient
  | IDeleteIngredient;

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  data: TIngredients;
  itemsId: string[];
  bun: TIngredients;
}

export interface IAddIngredientConstructor {
  readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
  data: TIngredients;
}

export interface IResetIngredient {
  readonly type: typeof RESET_INGREDIENT;
  data: TIngredients;
}

export interface IMoveIngredient {
  data: {
    dragIndex: number;
    hoverIndex: number;
  };
  readonly type: typeof MOVE_INGREDIENT;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  data: TIngredients;
  id: string;
}
