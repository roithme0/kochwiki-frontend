import { ShoppingListItemIngredient } from './shopping-list-item-ingredient';

export interface ShoppingList {
  customUserId: number;
  shoppingListItemIngredients: ShoppingListItemIngredient[];
}
