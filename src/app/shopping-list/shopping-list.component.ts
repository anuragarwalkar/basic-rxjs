import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";

import { ShoppingListService } from "./shopping-list.service";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import GlobalState, { ShoppingListState } from "./shopping-list.model";
import { StartEdit } from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<ShoppingListState>;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<GlobalState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit!");
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit({ index }));
  }

  ngOnDestroy() {}
}
