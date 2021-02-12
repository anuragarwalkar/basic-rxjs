import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Recipe } from "./recipe.model";
import { Store } from "@ngrx/store";
import { RootState } from "../app.reducer";
import {
  FetchRecipesStart,
  FETCH_RECIPES_SUCCESS,
} from "./store/recipe.action";
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<RootState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("recipe").pipe(
      take(1),
      map((recipeState) => {
        return recipeState.recipes;
      }),
      switchMap((recipes: Recipe[]) => {
        if (recipes && recipes.length === 0) {
          this.store.dispatch(new FetchRecipesStart());
          return this.actions$.pipe(ofType(FETCH_RECIPES_SUCCESS), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
