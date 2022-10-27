import { constructorReducer } from "./reducers/constructorReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { detailsReducer } from "./reducers/detailsReducer";
import { orderReducer } from "./reducers/orderReducer";
import { authorizationReducer } from "./reducers/authReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
	burgerConstructor: constructorReducer,
	burgerIngredients: ingredientsReducer,
	ingredientDetails: detailsReducer,
	order: orderReducer,
	authorization: authorizationReducer
});