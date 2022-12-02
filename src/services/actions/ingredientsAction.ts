import { getIngredientsData } from "../../utils/api";
import { TIngredients, AppThunk, AppDispatch } from "../types";

export const BURGER_INGREDIENTS_REQUEST = "BURGER_INGREDIENTS_REQUEST";
export const BURGER_INGREDIENTS_SUCCESS = "BURGER_INGREDIENTS_SUCCESS";
export const BURGER_INGREDIENTS_FAILED = "BURGER_INGREDIENTS_FAILED";

export type TIngredientsActions =
  | IBurgerIngredientsRequest
  | IBurgerIngredientsSuccess
  | IBurgerIngredientsFailed;

export interface IBurgerIngredientsRequest {
  readonly type: typeof BURGER_INGREDIENTS_REQUEST;
}
export interface IBurgerIngredientsSuccess {
  readonly type: typeof BURGER_INGREDIENTS_SUCCESS;
  ingredients: Array<TIngredients>;
}
export interface IBurgerIngredientsFailed {
  readonly type: typeof BURGER_INGREDIENTS_FAILED;
}

export const getBurgerIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: BURGER_INGREDIENTS_REQUEST,
    });
    getIngredientsData()
      .then((res) => {
        dispatch({
          type: BURGER_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: BURGER_INGREDIENTS_FAILED,
        });
      });
  };
};
