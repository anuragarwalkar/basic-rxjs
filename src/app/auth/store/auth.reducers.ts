import { User } from "../user.model";
import { AuthActions, LOGIN, LOGOUT } from "./auth.actions";
import AuthState from "./models/authState.model";

const inititalAuthState: AuthState = {
  user: null,
};

export function authReducers(
  state = inititalAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN: {
      const { email, userId, token, expirationDate } = action.payload;
      const user = new User(email, userId, token, expirationDate);
      return { ...state, user };
    }
    case LOGOUT: {
      return { ...state, user: null };
    }
    default: {
      return state;
    }
  }
}
