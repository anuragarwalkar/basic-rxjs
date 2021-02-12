import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { RootState } from "src/app/app.reducer";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import RecipeState from "../store/recipeState.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<RootState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("recipe")
      .pipe(map((recipeState: RecipeState) => recipeState.recipes))
      .subscribe((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        }
      });
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
