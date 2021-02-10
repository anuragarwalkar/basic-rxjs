import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";

import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import { StartEdit } from "./store/shopping-list.actions";
import ShoppingListState from "./shopping-list.model";
import { RootState } from "../app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<ShoppingListState>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<RootState>
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
