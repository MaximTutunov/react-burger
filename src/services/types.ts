//imports

import { Action, ActionCreator } from "redux";
import {ThunkAction} from 'redux-thunk';
import {rootReducer} from  './root-reducer';
import { store } from "./store";
import {useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook} from 'react-redux';
import {store} from './store';



// aggregating Ttypes
//types for thunks reducer user

export type RootState =ReturnType<typeof rootReducer>;

type TAppActions =|T|T|T|;

export type AppThunk<ReturnType = void> =ActionCreator<ThunkAction<ReturnType, Action, RootState, TAppActions>>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>;

export const useTypedSelector: TypedUseSelectorHook<RootState> =selectorHook; 

