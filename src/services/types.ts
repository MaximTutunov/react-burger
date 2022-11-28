//imports

import { Action, ActionCreator } from "redux";
import {ThunkAction} from 'redux-thunk';
import {rootReducer} from  './root-reducer';
import { store } from "./store";
import {useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook} from 'react-redux';
import {store} from './store';
import { ReactNode } from "react";



// aggregating Ttypes

type TApppActions = ||||
//types for thunks reducer user

export type RootState =ReturnType<typeof rootReducer>;

type TAppActions =|T|T|T|;

export type AppThunk<ReturnType = void> =ActionCreator<ThunkAction<ReturnType, Action, RootState, TAppActions>>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>;

export const useTypedSelector: TypedUseSelectorHook<RootState> =selectorHook; 


export type TUser ={
    email?: string;
    name?: string;
    createdAt?:string;
    updatedAt?: string;
}
export type TUserResponse ={
    success:boolean;
    user:TUser;
    accessToken: string;
    refreshToken: string;
    message: string;
}

export type TIngredients ={
    type: "bun" | "main" | "sauce";
    __v: number;
    _id: string;
    id?: string;
    count?: number;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
}

export type TOrders = {
    ingredients: TIngredients[];
    createdAt: string;
    name: string;
    number: number;
    owner: TUser;
    _id: string;
    price: number;
    status: string;
    updatedAt: string;
}
export type TFeed = {
   
    createdAt: string; 
    ingredients: string[];
    name: string;
    number: number;
       
    status: string;
    updatedAt: string; 
    _id: string;
}

export type TModal ={
    title: string;
    children: ReactNode;
    onClickClose: () => void;
}

export type TModalOverlay ={
    
    onClickClose: () => void;
}
export type TLocation ={
background:{
    pathname: string;
    search: string;
    hash: string;
    state:null;
    key:string;
}
from:string;
state?:object;
}

export type THeaders ={
"Content-Type": string;
Authorizaton?: string;
}

export type TRequest ={
method:string;
headers:THeaders;
body?: string | null;
mode?: any;
cache?: any;
credentials?:any;
redirect?:any;
referrerPolicy?:any;
}

export type TWSMiddleWareActions ={
    wsInit: string;
    wsSendMessage:string;
    onOpen:string;
    onClose: string;
    onError:string;
    onMessage:string:

}


export type TUserLogoutResponse ={
    message: string;
    success:boolean;
    
    refreshToken: string;
    
}


export type TOrderDetailsResponse ={
name:string;
order:TOrders;
success:boolean;
}

export type TIngredientsResponse ={
data: Array<TIngredients>;
success: boolean;
}

export type TFeedResponse ={
    
    success: boolean;
    total: number;
    totalToday: number;
    orders: Array<TFeed>;
    }





