import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { FoodstuffService } from '../../../foodstuffs/shared/services/foodstuff.service';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
// fetch foodstuffs associated with recipe
// render ingredients as grid
export class IngredientsGridComponent {
  foodstuffService = inject(FoodstuffService);

  @Input() recipe: Recipe | undefined;

  // fetch foodstuffs associated with recipe
  ngOnInit() {
    if (this.recipe === undefined) {
      console.error('no recipe provided');
      return;
    }

    for (let ingredient of this.recipe.ingredients) {
      this.foodstuffService.getFoodstuffById(ingredient.foodstuffId).subscribe({
        next: (foodstuff) => {
          console.debug('fetched foodstuff: ', foodstuff);
          ingredient.foodstuff = foodstuff;
        },
        error: (error) => {
          console.error('failed to fetch foodstuff: ', error);
        },
      });
    }
  }
}
