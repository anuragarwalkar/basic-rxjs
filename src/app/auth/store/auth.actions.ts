import { Action } from "@ngrx/store";
import LoginPayload from "./models/loginPayload.model";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginPayload) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
