export const CLOSE_INGREDIENT_MODAL: "CLOSE_INGREDIENT_MODAL"= "CLOSE_INGREDIENT_MODAL";
export type TCloseIngredientModalAction = ICloseIngredientModal;
export interface ICloseIngredientModal {
  readonly type: typeof CLOSE_INGREDIENT_MODAL;
}
export const closeIngredientModal = ():ICloseIngredientModal => {
  return {
    type: CLOSE_INGREDIENT_MODAL,
  };
};
