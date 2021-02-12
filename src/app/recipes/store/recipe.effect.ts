import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { FetchRecipesSuccess, FETCH_RECIPES_START } from "./recipe.action";

@Injectable()
export class RecipeEffects {
  authLogin = createEffect(() =>
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

  constructor(private actions$: Actions, private http: HttpClient) {}
}
