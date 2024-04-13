import { Foodstuff } from '../../../ingredients/shared/interfaces/foodstuff';

export interface Amount {
  id: number;
  index: number;
  ingredient: Foodstuff;
  ingredientId: number;
  amount: number;
  recipeId: number;
}
