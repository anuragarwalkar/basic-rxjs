import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const FETCH_RECIPES_START = "[Recipe] Fetch Recipes Start";
export const FETCH_RECIPES_SUCCESS = "[Recipe] Fetch Recipes Success";
export const ADD_RECIPE = "[Recipe] Add Recipe";
export const UPDATE_RECIPE = "[Recipe] Update Recipe";
export const DELETE_RECIPE = "[Recipe] Delete Recipe";

export class FetchRecipesStart implements Action {
  readonly type = FETCH_RECIPES_START;
}

export class FetchRecipesSuccess implements Action {
  readonly type = FETCH_RECIPES_SUCCESS;

  constructor(public payload: { recipes: Recipe[] }) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: { recipe: Recipe }) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; recipe: Recipe }) {}
}
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: { index: number }) {}
}

export type RecipeActions =
  | FetchRecipesStart
  | FetchRecipesSuccess
  | DeleteRecipe
  | UpdateRecipe
  | AddRecipe;
