import { ShoppingList } from './shopping-list';

export interface ShoppingListItemIngredient {
  id: number;
  isChecked: boolean;
  isPinned: boolean;
  amount: number;
  shoppingListIds: number[];
  name: string;
  brand: string | null;
  unitVerbose: string;
  unit: string;
  recipeName: string;
}
