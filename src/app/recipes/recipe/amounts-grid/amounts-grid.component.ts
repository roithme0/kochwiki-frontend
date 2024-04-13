import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { FoodstuffService } from '../../../ingredients/shared/services/foodstuff.service';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-amounts-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './amounts-grid.component.html',
  styleUrl: './amounts-grid.component.css',
})
// fetch foodstuffs associated with recipe
// render amounts as grid
export class AmountsGridComponent {
  ingredientService = inject(FoodstuffService);

  @Input() recipe: Recipe | undefined;

  // fetch foodstuffs associated with recipe
  ngOnInit() {
    if (this.recipe === undefined) {
      console.error('no recipe provided');
      return;
    }

    for (let amount of this.recipe.amounts) {
      this.ingredientService.getIngredientById(amount.ingredientId).subscribe({
        next: (ingredient) => {
          console.debug('fetched ingredient: ', ingredient);
          amount.ingredient = ingredient;
        },
        error: (error) => {
          console.error('failed to fetch ingredient: ', error);
        },
      });
    }
  }
}
