import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Recipe } from '../../interfaces/recipe';

import { RecipeService } from '../../services/recipe.service';
import { RecipesGridControlsService } from './recipes-grid-controls.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class RecipesGridHelperServiceService {
  private recipeService: RecipeService = inject(RecipeService);
  private snackBarService: MatSnackBar = inject(MatSnackBar);

  private _recipes: WritableSignal<Recipe[]> = signal([]);
  private _loading: WritableSignal<boolean> = signal(true);
  private _error: WritableSignal<boolean> = signal(false);

  // track changes to recipes
  constructor() {
    this.recipeService.recipes$.subscribe(() => {
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
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        console.debug('fetched recipes: ', recipes);
        this._recipes.set(recipes);
        this._error.set(false);
      },
      error: (err) => {
        console.error('failed to fetch recipes: ', err);
        this.snackBarService.open('Rezepte konnten nicht geladen werden', '', {
          duration: 5000,
        });
        this._error.set(true);
        this._loading.set(false);
      },
      complete: () => {
        this._loading.set(false);
      },
    });
  }
}
