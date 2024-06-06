import { ShoppingList } from './shopping-list';

export interface ShoppingListItemIngredient {
  id: number;
  isChecked: boolean;
  isPinned: boolean;
  amount: number;
  name: string;
  brand: string | null;
  unit: string;
  unitVerbose: string;
  recipeName: string;
  shoppingLists: ShoppingList[];
}
