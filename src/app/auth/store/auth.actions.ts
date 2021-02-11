import { Action } from "@ngrx/store";
import LoginPayload from "./models/loginPayload.model";

export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const LOGIN_START = "[Auth] Login Start";
export const LOGIN_FAIL = "[Auth] Login Fail";

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

export class LoginFail implements LoginFail {
  readonly type = LOGIN_FAIL;
  constructor(public payload: { message: string }) {}
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
