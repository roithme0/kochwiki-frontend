import { Component, inject, input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ShoppingListBackendService } from '../../../shopping-list/services/shopping-list-backend.service';

import { Ingredient } from '../../interfaces/ingredient';

@Component({
  selector: 'app-ingredients-grid-shopping-list-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './ingredients-grid-shopping-list-button.component.html',
  styleUrl: './ingredients-grid-shopping-list-button.component.css',
})
export class IngredientsGridShoppingListButtonComponent {
  ingredient = input.required<Ingredient>();
  servings = input.required<number>();

  shoppingListBackendService = inject(ShoppingListBackendService);

  OnAddToShoppingList() {
    this.shoppingListBackendService
      .addIngredient(this.ingredient(), this.servings())
      .subscribe({
        next: (shoppingList) => {
          console.info('Ingredient added to shopping list.');
        },
        error: (error) => {
          console.error('Error adding ingredient to shopping list:', error);
        },
      });
  }

  OnRemoveFromShoppingList() {
    this.shoppingListBackendService
      .removeIngredient(this.ingredient())
      .subscribe({
        next: (shoppingList) => {
          console.info('Ingredient removed from shopping list.');
        },
        error: (error) => {
          console.error('Error removing ingredient from shopping list:', error);
        },
      });
  }
}
