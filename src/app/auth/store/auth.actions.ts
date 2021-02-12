import { Action } from "@ngrx/store";
import LoginPayload from "./models/loginPayload.model";

export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const LOGIN_START = "[Auth] Login Start";
export const SIGNUP_START = "[Auth] Signup Start";
export const LOGIN_FAIL = "[Auth] Login Fail";
export const SIGNUP_FAIL = "[Auth] Signup Fail";
export const CLEAR_ERROR = "[Auth] Clear Error";
export const AUTO_LOGIN = "[Auth] Auto Login";

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: LoginPayload) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: { message: string }) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class SignupFail implements Action {
  readonly type = SIGNUP_FAIL;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | Login
  | Logout
  | LoginStart
  | LoginFail
  | SignupStart
  | SignupFail
  | ClearError
  | AutoLogin;
