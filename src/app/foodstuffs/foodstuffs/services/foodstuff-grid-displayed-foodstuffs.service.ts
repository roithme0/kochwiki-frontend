import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';

import { Foodstuff } from '../../shared/interfaces/foodstuff';

import { FoodstuffService } from '../../shared/services/foodstuff.service';
import { FoodstuffsGridControlsService } from './foodstuff-grid-controls.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
// provide displayed foodstuffs for the foodstuffs grid
export class FoodstuffsGridDisplayedFoodstuffsService {
  private foodstuffService = inject(FoodstuffService);
  private foodstuffsGridControlsService = inject(FoodstuffsGridControlsService);
  private snackBarService = inject(MatSnackBar);

  private foodstuffs: WritableSignal<Foodstuff[]> = signal([]);
  // apply search & filter functions to foodstuffs
  private _displayedFoodstuffs: Signal<Foodstuff[]> = computed(() => {
    var displayedFoodstuffs = this.foodstuffs();
    displayedFoodstuffs =
      this.searchFoodstuffsByNameOrBrand(displayedFoodstuffs);
    displayedFoodstuffs = this.filterFoodstuffsByUnit(displayedFoodstuffs);
    return displayedFoodstuffs;
  });

  private searchBy: Signal<string> =
    this.foodstuffsGridControlsService.searchBy;
  private filterBy: Signal<string> =
    this.foodstuffsGridControlsService.filterBy;

  private _loading: WritableSignal<boolean> = signal(true);
  private _error: WritableSignal<boolean> = signal(false);

  constructor() {
    this.foodstuffService.foodstuffs$.subscribe(() => {
      this.fetchFoodstuffs();
    });

    this.fetchFoodstuffs();
  }

  get displayedFoodstuffs(): Signal<Foodstuff[]> {
    return this._displayedFoodstuffs;
  }

  get loading(): Signal<boolean> {
    return this._loading;
  }

  get error(): Signal<boolean> {
    return this._error;
  }

  // fetch all foodstuffs
  private async fetchFoodstuffs() {
    this._loading.set(true);
    this.foodstuffService.getAllFoodstuffs().subscribe({
      next: (foodstuffs) => {
        console.debug('fetched foodstuffs: ', foodstuffs);
        this.foodstuffs.set(foodstuffs);
        this._error.set(false);
      },
      error: (error) => {
        console.error('failed to fetch foodstuffs: ', error);
        this.snackBarService.open(
          'Lebensmittel konnten nicht geladen werden',
          '',
          {
            duration: 5000,
          }
        );
        this._error.set(true);
        this._loading.set(false);
      },
      complete: () => {
        this._loading.set(false);
      },
    });
  }

  private searchFoodstuffsByNameOrBrand(foodstuffs: Foodstuff[]): Foodstuff[] {
    const searchBy: string = this.searchBy();
    console.debug('searching foodstuffs by: ' + searchBy);
    if (searchBy === '') {
      return foodstuffs;
    }
    return foodstuffs.filter((foodstuff) => {
      return (
        foodstuff.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        foodstuff.brand?.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }

  private filterFoodstuffsByUnit(foodstuffs: Foodstuff[]): Foodstuff[] {
    const filterBy: string = this.filterBy();
    console.debug('filtering foodstuffs by: ' + filterBy);
    if (filterBy === 'all') {
      return foodstuffs;
    }
    return foodstuffs.filter((foodstuff) => {
      return foodstuff.unit === filterBy;
    });
  }
}
