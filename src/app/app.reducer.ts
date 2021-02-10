import { ActionReducerMap } from "@ngrx/store";
import { authReducers } from "./auth/store/auth.reducers";
import AuthState from "./auth/store/models/authState.model";
import ShoppingListState from "./shopping-list/shopping-list.model";
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";

export interface RootState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}

export const RootReducer: ActionReducerMap<RootState> = {
  shoppingList: shoppingListReducer,
  auth: authReducers,
};
