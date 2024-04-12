import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';

import { Ingredient } from '../../shared/interfaces/ingredient';

import { IngredientService } from '../../shared/services/ingredient.service';
import { IngredientsGridControlsService } from './ingredients-grid-controls.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridDisplayedIngredientsService {
  // provide displayed ingredients for ingredients grid
  private ingredientService: IngredientService = inject(IngredientService);
  private ingredientsGridControlsService: IngredientsGridControlsService =
    inject(IngredientsGridControlsService);
  private snackBarService: MatSnackBar = inject(MatSnackBar);

  private ingredients: WritableSignal<Ingredient[]> = signal([]);
  private _displayedIngredients: Signal<Ingredient[]> = computed(() => {
    // apply search & filter functions to ingredients
    var displayedIngredients = this.ingredients();
    displayedIngredients =
      this.searchIngredientsByNameOrBrand(displayedIngredients);
    displayedIngredients = this.filterIngredientsByUnit(displayedIngredients);
    return displayedIngredients;
  });

  private searchBy: Signal<string> =
    this.ingredientsGridControlsService.searchBy;
  private filterBy: Signal<string> =
    this.ingredientsGridControlsService.filterBy;

  private _loading: WritableSignal<boolean> = signal(true);
  private _error: WritableSignal<boolean> = signal(false);

  constructor() {
    // track changes to ingredients
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
    
    this.fetchIngredients();
  }

  get displayedIngredients(): Signal<Ingredient[]> {
    return this._displayedIngredients;
  }

  get loading(): Signal<boolean> {
    return this._loading;
  }

  get error(): Signal<boolean> {
    return this._error;
  }

  private async fetchIngredients() {
    // fetch all ingredients
    this._loading.set(true);
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.debug('fetched ingredients: ', ingredients);
        this.ingredients.set(ingredients);
        this._error.set(false);
      },
      error: (error) => {
        console.error('failed to fetch ingredients: ', error);
        this.snackBarService.open('Zutaten konnten nicht geladen werden', '',{duration: 5000});
        this._error.set(true);
        this._loading.set(false);
      },
      complete: () => {
        this._loading.set(false);
      }
    });
  }

  private searchIngredientsByNameOrBrand(
    ingredients: Ingredient[]
  ): Ingredient[] {
    const searchBy: string = this.searchBy();
    console.debug('searching ingredients by: ' + searchBy);
    if (searchBy === '') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return (
        ingredient.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        ingredient.brand?.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }

  private filterIngredientsByUnit(ingredients: Ingredient[]): Ingredient[] {
    const filterBy: string = this.filterBy();
    console.debug('filtering ingredients by: ' + filterBy);
    if (filterBy === 'all') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return ingredient.unit === filterBy;
    });
  }
}
