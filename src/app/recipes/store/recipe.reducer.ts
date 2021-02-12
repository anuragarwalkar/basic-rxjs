import { FETCH_RECIPES_SUCCESS, RecipeActions } from "./recipe.action";
import RecipeState from "./recipeState.model";

const recipeState: RecipeState = {
  recipes: null,
  selectedRecipe: null,
};

export default function recipeReducer(
  state = recipeState,
  action: RecipeActions
) {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS: {
      const { recipes } = action.payload;
      return {
        ...state,
        recipes,
      };
    }
    default: {
      return { ...state };
    }
  }
}
