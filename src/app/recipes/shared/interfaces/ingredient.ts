import { Foodstuff } from '../../../foodstuffs/shared/interfaces/foodstuff';

export interface Ingredient {
  id: number;
  index: number;
  foodstuff: Foodstuff;
  foodstuffId: number;
  amount: number;
  recipeId: number;
}
