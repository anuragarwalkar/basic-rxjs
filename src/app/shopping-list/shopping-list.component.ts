import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import ShoppingList, { Ingredients } from "./shopping-list.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<Ingredients>;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<ShoppingList>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit!");
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {}
}
