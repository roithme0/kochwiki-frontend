import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';

import { RecipeService } from '../../shared/services/recipe.service';

import { Recipe } from '../../shared/interfaces/recipe';
import { RecipesGridControlsService } from './recipes-grid-controls.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class RecipesGridDisplayedRecipesService {
  // fetch all recipes
  // filter recipes by search input
  private recipeService: RecipeService = inject(RecipeService);
  private recipesGridControlsService: RecipesGridControlsService = inject(
    RecipesGridControlsService
  );

  private recipes: WritableSignal<Recipe[]> = signal([]);
  private _displayedRecipes: Signal<Recipe[]> = computed(() => {
    // apply search input to recipes
    // sort recipes
    var displayedRecipes = this.recipes();
    displayedRecipes = this.filterRecipesByNameOrOrigin(displayedRecipes);
    displayedRecipes = this.sortRecipes('name', displayedRecipes);
    return displayedRecipes;
  });
  private snackBarService: MatSnackBar = inject(MatSnackBar);

  private _loading: WritableSignal<boolean> = signal(true);
  private _error: WritableSignal<boolean> = signal(false);

  private searchBy: Signal<string> =
    this.recipesGridControlsService.searchBy;

  constructor() {
    // track changes to recipes
    this.recipeService.recipes$.subscribe(() => {
      this.fetchRecipes();
    });

    this.fetchRecipes();
  }

  get displayedRecipes(): Signal<Recipe[]> {
    return this._displayedRecipes;
  }

  get loading(): Signal<boolean> {
    return this._loading;
  }

  get error(): Signal<boolean> {
    return this._error;
  }

  private async fetchRecipes() {
    // fetch all recipes
    this._loading.set(true);
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        console.debug('fetched recipes: ', recipes);
        this.recipes.set(recipes);
        this._error.set(false);
      },
      error: (err) => {
        console.error('failed to fetch recipes: ', err);
        this.snackBarService.open('Rezepte konnten nicht geladen werden', '',{duration: 5000});
        this._error.set(true);
        this._loading.set(false);
      },
      complete: () => {
        this._loading.set(false);
      }
    });
  }

  private filterRecipesByNameOrOrigin(recipes: Recipe[]): Recipe[] {
    // filter recipes by search input
    const searchBy = this.searchBy();
    if (searchBy === '') {
      return recipes;
    }
    return recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        recipe.originName?.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }

  private sortRecipes(sortBy: string, recipes: Recipe[]): Recipe[] {
    // sort recipes by field
    const sortedRecipes = [...recipes];
    return sortedRecipes.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      console.debug('sortBy invalid: ', sortBy);
      return 0;
    });
  }
}
