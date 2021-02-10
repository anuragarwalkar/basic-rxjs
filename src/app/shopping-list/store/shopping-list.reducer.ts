import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListState } from "../shopping-list.model";
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT,
} from "./shopping-list.actions";

const inititalState: ShoppingListState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state = inititalState,
  action: ShoppingListActions
): ShoppingListState {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    }
    case UPDATE_INGREDIENT: {
      const { ingredient } = action.payload;
      const { ingredients: clonedIngredients, editedIngredientIndex: index } = {
        ...state,
      };
      clonedIngredients[index] = ingredient;
      return {
        ...state,
        ingredients: clonedIngredients,
      };
    }
    case DELETE_INGREDIENT: {
      const { editedIngredientIndex: index } = state;
      const clonedIngredients = [...state.ingredients];
      clonedIngredients.splice(index, 1);
      return {
        ...state,
        ingredients: clonedIngredients,
      };
    }
    case START_EDIT: {
      const { index } = action.payload;
      return {
        ...state,
        editedIngredientIndex: index,
        editedIngredient: { ...state.ingredients[index] },
      };
    }
    case STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    default:
      return state;
  }
}
