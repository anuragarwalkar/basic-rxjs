import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { RootState } from "src/app/app.reducer";
import { Recipe } from "../recipe.model";
import {
  FetchRecipesSuccess,
  FETCH_RECIPES_START,
  SaveRecipes,
  SAVE_RECIPES_START,
} from "./recipe.action";

@Injectable()
export class RecipeEffects {
  postRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(SAVE_RECIPES_START),
      withLatestFrom(this.store.select("recipe")),
      switchMap(([actionData, recipesData]) => {
        return this.http.put<Recipe[]>("/recipes.json", recipesData.recipes);
      }),
      map((res) => {
        return new SaveRecipes({ recipes: res });
      })
    )
  );

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_RECIPES_START),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          "https://ng-rx-basic-default-rtdb.firebaseio.com/recipes.json"
        );
      }),
      map((recipes: Recipe[]) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new FetchRecipesSuccess({ recipes });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<RootState>
  ) {}
}
