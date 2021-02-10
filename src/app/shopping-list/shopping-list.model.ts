import { Ingredient } from "../shared/ingredient.model";
export default interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
