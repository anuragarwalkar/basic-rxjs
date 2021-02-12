import { Recipe } from "../recipe.model";

export default interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe;
}
