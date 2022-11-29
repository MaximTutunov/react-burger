import { deleteCookie, setCookie } from "../../utils/cookie";
import { AppDispatch, TUser, AppThunk } from "../types";
import {
  getUserRequest,
  forgotPassRequest,
  updateUserRequest,
  resetPassRequest,
  loginRequest,
  logoutRequest,
  registerUserRequest,
  updateTokenRequest,
} from "../../utils/api";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" =
  "FORGOT_PASSWORD_FAILED";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const LOGIN_FORM_SET_VALUE: "LOGIN_FORM_SET_VALUE" =
  "LOGIN_FORM_SET_VALUE";
export const LOGIN_FORM_REQUEST: "LOGIN_FORM_REQUEST" = "LOGIN_FORM_REQUEST";
export const LOGIN_FORM_SUCCESS: "LOGIN_FORM_SUCCESS" = "LOGIN_FORM_SUCCESS";
export const LOGIN_FORM_FAILED: "LOGIN_FORM_FAILED" = "LOGIN_FORM_FAILED";

export const LOGOUT_FORM_REQUEST: "LOGOUT_FORM_REQUEST" = "LOGOUT_FORM_REQUEST";
export const LOGOUT_FORM_SUCCESS: "LOGOUT_FORM_SUCCESS" = "LOGOUT_FORM_SUCCESS";
export const LOGOUT_FORM_FAILED: "LOGOUT_FORM_FAILED" = "LOGOUT_FORM_FAILED";

export const PATCH_USER_REQUEST: "PATCH_USER_REQUEST" = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS: "PATCH_USER_SUCCESS" = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED: "PATCH_USER_FAILED" = "PATCH_USER_FAILED";

export const REGISTER_FORM_SET_VALUE: "REGISTER_FORM_SET_VALUE" =
  "REGISTER_FORM_SET_VALUE";
export const REGISTER_FORM_REQUEST: "REGISTER_FORM_REQUEST" =
  "REGISTER_FORM_REQUEST";
export const REGISTER_FORM_SUCCESS: "REGISTER_FORM_SUCCESS" =
  "REGISTER_FORM_SUCCESS";
export const REGISTER_FORM_FAILED: "REGISTER_FORM_FAILED" =
  "REGISTER_FORM_FAILED";

export const RESET_FORM_SET_VALUE: "RESET_FORM_SET_VALUE" =
  "RESET_FORM_SET_VALUE";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";

export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" =
  "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" =
  "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

export type TAuthActions =
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | ILoginFormSetValue
  | ILoginFormRequest
  | ILoginFormSuccess
  | ILoginFormFailed
  | ILogoutFormRequest
  | ILogoutFormSuccess
  | ILogoutFormFailed
  | IPatchUserRequest
  | IPatchUserSuccess
  | IPatchUserFailed
  | IRegisterFormSetValue
  | IRegisterFormSuccess
  | IRegisterFormRequest
  | IRegisterFormFailed
  | IResetFormSetValue
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateTokenFailed;

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  message: string;
}
interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export const forgotPassword: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPassRequest(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: res.message,
        });
      })
      .catch(() => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
};

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}
interface IGetUserSuccess {
  readonly user: TUser;
  readonly type: typeof GET_USER_SUCCESS;
}
interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

interface ILoginFormSetValue {
  readonly type: typeof LOGIN_FORM_SET_VALUE;
  field: string;
  value: string;
}
interface ILoginFormRequest {
  readonly type: typeof LOGIN_FORM_REQUEST;
}
interface ILoginFormSuccess {
  readonly user: TUser;
  readonly type: typeof LOGIN_FORM_SUCCESS;
}
interface ILoginFormFailed {
  readonly type: typeof LOGIN_FORM_FAILED;
}
export const singIn: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_FORM_REQUEST,
    });
    loginRequest(email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: LOGIN_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FORM_FAILED,
        });
      });
  };
};

interface ILogoutFormRequest {
  readonly type: typeof LOGOUT_FORM_REQUEST;
}
interface ILogoutFormSuccess {
  readonly type: typeof LOGOUT_FORM_SUCCESS;
}
interface ILogoutFormFailed {
  readonly type: typeof LOGOUT_FORM_FAILED;
}
export const singOut: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_FORM_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        const refreshToken = res.refreshToken;
        deleteCookie("token");
        localStorage.removeItem( refreshToken);
        if (res && res.success) {
          dispatch({
            type: LOGOUT_FORM_SUCCESS,
          });
        } else {
          dispatch({ type: LOGOUT_FORM_FAILED });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FORM_FAILED,
        });
      });
  };
};

interface IPatchUserRequest {
  readonly type: typeof PATCH_USER_REQUEST;
}
interface IPatchUserSuccess {
  readonly user: TUser;
  readonly type: typeof PATCH_USER_SUCCESS;
}
interface IPatchUserFailed {
  readonly type: typeof PATCH_USER_FAILED;
}
export const updateUser: AppThunk = (
  email: string,
  name: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    updateUserRequest(email, name, password)
      .then((res) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
      });
  };
};

interface IRegisterFormSetValue {
  readonly type: typeof REGISTER_FORM_SET_VALUE;
  value: string;
  field: string;
}
interface IRegisterFormSuccess {
  readonly type: typeof REGISTER_FORM_SUCCESS;
  readonly user: TUser;
}
interface IRegisterFormRequest {
  readonly type: typeof REGISTER_FORM_REQUEST;
}
interface IRegisterFormFailed {
  readonly type: typeof REGISTER_FORM_FAILED;
}
export const registerUser: AppThunk = (
  email: string,
  password: string,
  name: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_FORM_REQUEST,
    });
    registerUserRequest(email, password, name)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: REGISTER_FORM_SUCCESS,
          user: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FORM_FAILED,
        });
      });
  };
};

interface IResetFormSetValue {
  readonly type: typeof RESET_FORM_SET_VALUE;
  field: string;
  value: string;
}
interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export const resetPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPassRequest(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
};

interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}
interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export const updateToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    updateTokenRequest()
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", authToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
};

export const setResetFormValue = (field: string, value: string) => ({
  type: RESET_FORM_SET_VALUE,
  field,
  value,
});

export const setLoginFormValue = (field: string, value: string) => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value,
});

export const setRegisterFormValue = (field: string, value: string) => ({
  type: REGISTER_FORM_SET_VALUE,
  field,
  value,
});
