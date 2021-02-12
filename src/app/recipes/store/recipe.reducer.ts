import {
  ADD_RECIPE,
  DELETE_RECIPE,
  FETCH_RECIPES_SUCCESS,
  RecipeActions,
  UPDATE_RECIPE,
} from "./recipe.action";
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

    case ADD_RECIPE: {
      const { recipe } = action.payload;
      debugger;
      const newState = {
        ...state,
        recipes: state.recipes ? [...state.recipes, recipe] : [recipe],
      };
      return newState;
    }
    case UPDATE_RECIPE: {
      const { recipe, index } = action.payload;
      const clonedRecipes = [...state.recipes];
      clonedRecipes[index] = recipe;
      return {
        ...state,
        recipes: clonedRecipes,
      };
    }
    case DELETE_RECIPE: {
      const { index } = action.payload;
      const clonedRecipes = [...state.recipes];
      clonedRecipes.splice(index, 1);
      return {
        ...state,
        recipes: clonedRecipes,
      };
    }
    default: {
      return { ...state };
    }
  }
}
