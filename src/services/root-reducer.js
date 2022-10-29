import { constructorReducer } from "./reducers/constructorReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { detailsReducer } from "./reducers/detailsReducer";
import { orderReducer } from "./reducers/orderReducer";
import { authorizationReducer } from "./reducers/authReducer";
import { orderInfoReducer } from "./reducers/orderInfoReducer";
import { combineReducers } from "redux";
import { wsReducer } from "./reducers/wsReducer";
import { wsAuthReducer } from "./reducers/wsAuthReducer";

export const rootReducer = combineReducers({
	burgerConstructor: constructorReducer,
	burgerIngredients: ingredientsReducer,
	ingredientDetails: detailsReducer,
	order: orderReducer,
	authorization: authorizationReducer,
	orderInfo: orderInfoReducer,
	wsFeed: wsReducer,
	wsAuthFeed: wsAuthReducer,
});