import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Recipe } from '../../interfaces/recipe';

import { RecipeBackendService } from '../../services/recipe-backend.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { Unsubscribe } from '../../../utils/unsubsribe';
import { take, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesGridHelperServiceService extends Unsubscribe {
  private recipeBackendService = inject(RecipeBackendService);
  private snackBarService = inject(SnackBarService);

  private _recipes: WritableSignal<Recipe[]> = signal([]);
  private _loading: WritableSignal<boolean> = signal(true);
  private _error: WritableSignal<boolean> = signal(false);

  // track changes to recipes
  constructor() {
    super();

    this.recipeBackendService.recipes$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchRecipes();
      });

    this.fetchRecipes();
  }

  get recipes(): Signal<Recipe[]> {
    return this._recipes;
  }

  get loading(): Signal<boolean> {
    return this._loading;
  }

  get error(): Signal<boolean> {
    return this._error;
  }

  // fetch all recipes
  private async fetchRecipes() {
    this._loading.set(true);
    this.recipeBackendService
      .getAllRecipes()
      .pipe(take(1))
      .subscribe({
        next: (recipes) => {
          console.debug('fetched recipes: ', recipes);
          this._recipes.set(recipes);
          this._error.set(false);
        },
        error: (err) => {
          console.error('failed to fetch recipes: ', err);
          this.snackBarService.open('Rezepte konnten nicht geladen werden');
          this._error.set(true);
          this._loading.set(false);
        },
        complete: () => {
          this._loading.set(false);
        },
      });
  }
}
