import { Foodstuff } from '../../foodstuffs/interfaces/foodstuff';
import { ShoppingListItemIngredient } from '../../shopping-list/interfaces/shopping-list-item-ingredient';

export interface Ingredient {
  [key: string]: any;
  id: number;
  index: number;
  shoppingListItemIngredients: ShoppingListItemIngredient[];
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
