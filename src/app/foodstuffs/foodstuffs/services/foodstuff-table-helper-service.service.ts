import {
  Injectable,
  Signal,
  WritableSignal,
  signal,
  inject,
} from '@angular/core';

import { Foodstuff } from '../../shared/interfaces/foodstuff';

import { FoodstuffService } from '../../shared/services/foodstuff.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
// reduces backend calls
export class FoodstuffTableHelperServiceService {
  private foodstuffService = inject(FoodstuffService);
  private snackBarService = inject(MatSnackBar);

  private _foodstuffs: WritableSignal<Foodstuff[]> = signal([]);

  private _loading: WritableSignal<boolean> = signal(true);
  private _error: WritableSignal<boolean> = signal(false);

  constructor() {
    this.foodstuffService.foodstuffs$.subscribe(() => {
      this.fetchFoodstuffs();
    });

    this.fetchFoodstuffs();
  }

  get loading(): Signal<boolean> {
    return this._loading;
  }

  get error(): Signal<boolean> {
    return this._error;
  }

  get foodstuffs(): Signal<Foodstuff[]> {
    return this._foodstuffs;
  }

  // fetch all foodstuffs
  private async fetchFoodstuffs() {
    this._loading.set(true);
    this.foodstuffService.getAllFoodstuffs().subscribe({
      next: (foodstuffs) => {
        console.debug('fetched foodstuffs: ', foodstuffs);
        this._foodstuffs.set(foodstuffs);
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
}
