import {
  Component,
  WritableSignal,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../interfaces/recipe';

import { FoodstuffBackendService } from '../../../foodstuffs/services/foodstuff-backend.service';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
export class IngredientsGridComponent {
  //#region inputs and outputs

  recipe = input.required<Recipe>();

  //#endregion

  //#region services

  foodstuffBackendService = inject(FoodstuffBackendService);

  //#endregion services

  //#region fields

  isLoading: WritableSignal<boolean> = signal(false);
  hasError: WritableSignal<boolean> = signal(false);

  //#endregion

  constructor() {
    effect(() => {
      this.fetchAssociatedFoodstuffs(this.recipe());
    });
  }

  //#region utilities

  fetchAssociatedFoodstuffs(recipe: Recipe) {
    this.hasError.set(false);
    this.isLoading.set(true);

    const requests = this.recipe().ingredients.map((ingredient) =>
      this.foodstuffBackendService.getFoodstuffById(ingredient.foodstuffId)
    );

    if (requests.length === 0) {
      this.isLoading.set(false);
      return;
    }

    forkJoin(requests).subscribe({
      next: (foodstuffs) => {
        console.debug('fetched foodstuffs: ', foodstuffs);
        for (let i = 0; i < foodstuffs.length; i++) {
          this.recipe().ingredients[i].foodstuff = foodstuffs[i];
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('failed to fetch foodstuffs: ', error);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  //#endregion
}
