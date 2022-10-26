import { constructorReducer } from "./reducers/constructor";
import { ingredientsReducer } from "./reducers/ingredients";
import { detailsReducer } from "./reducers/details";
import { orderReducer } from "./reducers/order";
import { authorizationReducer } from "./reducers/authorization";
import { combineReducers } from "redux";


export const rootReducer = combineReducers({
	burgerConstructor: constructorReducer,
	burgerIngredients: ingredientsReducer,
	ingredientDetails: detailsReducer,
	order: orderReducer,
	authorization: authorizationReducer
});