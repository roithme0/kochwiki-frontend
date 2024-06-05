import { Foodstuff } from '../../foodstuffs/interfaces/foodstuff';

export interface Ingredient {
  [key: string]: any;
  id: number;
  index: number;
  foodstuff: Foodstuff;
  foodstuffId: number;
  amount: number;
  recipeId: number;
  name: string;
  brand: string | null;
  unit: string;
  unitVerbose: string;
  kcal: number | null;
  carbs: number | null;
  protein: number | null;
  fat: number | null;
}
