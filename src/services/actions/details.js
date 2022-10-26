export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";
export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";

export const closeIngredientModal = () => {
  return {
    type: CLOSE_INGREDIENT_MODAL,
  };
};

export const openIngredientModal = (ingredient) => {
	return {
	  type: OPEN_INGREDIENT_MODAL,
	  ingredient: ingredient,
	};
  };
