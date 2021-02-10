import { Ingredient } from "src/app/shared/ingredient.model";
import { Ingredients } from "../shopping-list.model";
import { AddIngredient, ADD_INGREDIENT } from "./shopping-list.actions";

const inititalState: Ingredients = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
};

export function shoppingListReducer(
  state = inititalState,
  action: AddIngredient
) {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    default:
      return state;
  }
}
