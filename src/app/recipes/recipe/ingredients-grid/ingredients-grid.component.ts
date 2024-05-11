import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { FoodstuffService } from '../../../foodstuffs/shared/services/foodstuff.service';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
// fetch foodstuffs associated with recipe
// render ingredients as grid
export class IngredientsGridComponent {
  foodstuffService = inject(FoodstuffService);

  @Input() recipe!: Recipe;

  isLoading: boolean = false;
  hasError: boolean = false;

  ngOnChanges() {
    this.hasError = false;
    this.fetchAssociatedFoodstuffs();
  }

  // fetch foodstuffs associated with recipe
  fetchAssociatedFoodstuffs() {
    this.isLoading = true;

    for (let ingredient of this.recipe.ingredients) {
      this.foodstuffService.getFoodstuffById(ingredient.foodstuffId).subscribe({
        next: (foodstuff) => {
          console.debug('fetched foodstuff: ', foodstuff);
          ingredient.foodstuff = foodstuff;
        },
        error: (error) => {
          console.error('failed to fetch foodstuff: ', error);
          this.hasError = true;
        },
      });
    }

    this.isLoading = false;
  }
}
