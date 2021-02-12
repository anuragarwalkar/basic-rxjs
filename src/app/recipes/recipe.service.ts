import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Store } from "@ngrx/store";
import GlobalState from "../shopping-list/shopping-list.model";
import { AddIngredients } from "../shopping-list/store/shopping-list.actions";
import { AddRecipe, DeleteRecipe, UpdateRecipe } from "./store/recipe.action";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private store: Store<GlobalState>) {}

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.store.dispatch(new AddRecipe({ recipe }));
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.store.dispatch(new UpdateRecipe({ index, recipe }));
  }

  deleteRecipe(index: number) {
    this.store.dispatch(new DeleteRecipe({ index }));
  }
}
