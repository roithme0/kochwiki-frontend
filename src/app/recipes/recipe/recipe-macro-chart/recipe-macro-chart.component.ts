import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { FoodstuffService } from '../../../foodstuffs/shared/services/foodstuff.service';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipe-macro-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './recipe-macro-chart.component.html',
  styleUrl: './recipe-macro-chart.component.css',
})
export class RecipeMacroChartComponent {
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

    const requests = this.recipe.ingredients.map((ingredient) =>
      this.foodstuffService.getFoodstuffById(ingredient.foodstuffId)
    );

    if (requests.length === 0) {
      this.isLoading = false;
      return;
    }

    forkJoin(requests).subscribe({
      next: (foodstuffs) => {
        console.debug('fetched foodstuffs: ', foodstuffs);
        for (let i = 0; i < foodstuffs.length; i++) {
          this.recipe.ingredients[i].foodstuff = foodstuffs[i];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('failed to fetch foodstuffs: ', error);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
