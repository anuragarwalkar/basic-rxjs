import { Ingredient } from "../shared/ingredient.model";

export default interface ShoppingList {
  shoppingList: Ingredients;
}

export interface Ingredients {
  ingredients: Ingredient[];
}
