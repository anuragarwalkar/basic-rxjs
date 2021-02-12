import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { RootState } from "src/app/app.reducer";

import { Ingredient } from "../../shared/ingredient.model";
import { AddIngredient, StopEdit } from "../store/shopping-list.actions";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select("shoppingList")
      .pipe(
        map((res) =>
          res.editedIngredientIndex > -1 ? res.editedIngredient : null
        )
      )
      .subscribe((res) => {
        this.editMode = !!res;

        if (res !== null) {
          this.editedItem = res;
          const { name, amount } = res;
          this.slForm.setValue({ name, amount });
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }

  onDelete() {
    this.onClear();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store.dispatch(new StopEdit());
  }
}
