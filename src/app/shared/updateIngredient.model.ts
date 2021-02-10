import { Ingredient } from "./ingredient.model";

export class UpdateIngredientModel {
  constructor(public index: number, public ingredient: Ingredient) {}
}
