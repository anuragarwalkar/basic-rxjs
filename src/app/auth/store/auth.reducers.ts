import { User } from "../user.model";
import {
  AuthActions,
  CLEAR_ERROR,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_START,
  LOGOUT,
} from "./auth.actions";
import AuthState from "./models/authState.model";

const inititalAuthState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducers(
  state = inititalAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN: {
      const { email, userId, token, expirationDate } = action.payload;
      const user = new User(email, userId, token, expirationDate);
      return { ...state, user, authError: null, loading: false };
    }
    case LOGOUT: {
      return { ...state, user: null, authError: null };
    }
    case LOGIN_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        authError: action.payload.message,
        loading: false,
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        authError: null,
      };
    }
    default: {
      return state;
    }
  }
}
