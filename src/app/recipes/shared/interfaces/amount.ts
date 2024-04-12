import { Ingredient } from '../../../ingredients/shared/interfaces/ingredient';

export interface Amount {
  id: number;
  index: number;
  ingredient: Ingredient;
  ingredientId: number;
  amount: number;
  recipeId: number;
}
