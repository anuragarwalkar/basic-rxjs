import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import { RootState } from "src/app/app.reducer";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import RecipeState from "../store/recipeState.model";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => {
          console.log("params:", params);
          this.id = +params["id"];
        }),
        switchMap(() => {
          return this.store.select("recipe");
        }),
        map((recipeState: RecipeState) => {
          return recipeState.recipes.find(
            (recipe: Recipe, index: number) => this.id === index
          );
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
