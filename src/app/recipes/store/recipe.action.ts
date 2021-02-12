import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const FETCH_RECIPES_START = "[Recipe] Fetch Recipes Start";
export const FETCH_RECIPES_SUCCESS = "[Recipe] Fetch Recipes Success";

export class FetchRecipesStart implements Action {
  readonly type = FETCH_RECIPES_START;
}

export class FetchRecipesSuccess implements Action {
  readonly type = FETCH_RECIPES_SUCCESS;

  constructor(public payload: { recipes: Recipe[] }) {}
}

export type RecipeActions = FetchRecipesStart | FetchRecipesSuccess;
