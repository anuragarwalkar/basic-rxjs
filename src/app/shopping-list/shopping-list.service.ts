import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import GlobalState from "./shopping-list.model";
import {
  DeleteIngredient,
  UpdateIngredient,
} from "./store/shopping-list.actions";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  constructor(private store: Store<GlobalState>) {}

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(ingredient: Ingredient) {
    const payload = { ingredient };
    this.store.dispatch(new UpdateIngredient(payload));
  }

  deleteIngredient() {
    this.store.dispatch(new DeleteIngredient());
  }
}
