import { Injectable, Signal, computed, inject } from '@angular/core';

import { Recipe } from '../../interfaces/recipe';

import { RecipesGridHelperServiceService } from './recipes-grid-helper-service.service';
import { RecipesGridControlsService } from './recipes-grid-controls.service';

@Injectable({
  providedIn: 'root',
})
// fetch all recipes
// filter recipes by search input
export class RecipesGridDisplayedRecipesService {
  private recipesGridHelperService = inject(RecipesGridHelperServiceService);
  private recipesGridControlsService: RecipesGridControlsService = inject(
    RecipesGridControlsService
  );

  private _recipes: Signal<Recipe[]> = this.recipesGridHelperService.recipes;
  // apply search input to recipes
  // sort recipes
  private _displayedRecipes: Signal<Recipe[]> = computed(() => {
    var displayedRecipes = this._recipes();
    displayedRecipes = this.filterRecipesByNameOrOrigin(displayedRecipes);
    displayedRecipes = this.sortRecipes('name', displayedRecipes);
    return displayedRecipes;
  });

  private searchBy: Signal<string> = this.recipesGridControlsService.searchBy;

  get displayedRecipes(): Signal<Recipe[]> {
    return this._displayedRecipes;
  }

  get loading(): Signal<boolean> {
    return this.recipesGridHelperService.loading;
  }

  get error(): Signal<boolean> {
    return this.recipesGridHelperService.error;
  }

  // filter recipes by search input
  private filterRecipesByNameOrOrigin(recipes: Recipe[]): Recipe[] {
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

  // sort recipes by field
  private sortRecipes(sortBy: string, recipes: Recipe[]): Recipe[] {
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
