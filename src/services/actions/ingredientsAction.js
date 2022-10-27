import { getIngredientsData } from "../../utils/api";

export const BURGER_INGREDIENTS_REQUEST = "BURGER_INGREDIENTS_REQUEST";
export const BURGER_INGREDIENTS_SUCCESS = "BURGER_INGREDIENTS_SUCCESS";
export const BURGER_INGREDIENTS_FAILED = "BURGER_INGREDIENTS_FAILED";

export function getBurgerIngredients() {
  return function (dispatch) {
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
}
