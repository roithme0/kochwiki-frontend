import {
  Injectable,
  Signal,
  WritableSignal,
  signal,
  inject,
} from '@angular/core';

import { Foodstuff } from '../../interfaces/foodstuff';

import { FoodstuffBackendService } from '../../services/foodstuff-backend.service';
import { SnackBarService } from '../../../services/snack-bar.service';
@Injectable({
  providedIn: 'root',
})
// reduces backend calls
export class FoodstuffTableHelperService {
  private foodstuffBackendService = inject(FoodstuffBackendService);
  private snackBarService = inject(SnackBarService);

  private _foodstuffs: WritableSignal<Foodstuff[]> = signal([]);

  private _loading: WritableSignal<boolean> = signal(true);
  private _error: WritableSignal<boolean> = signal(false);

  constructor() {
    this.foodstuffBackendService.foodstuffs$.subscribe(() => {
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
    this.foodstuffBackendService.getAllFoodstuffs().subscribe({
      next: (foodstuffs) => {
        console.debug('fetched foodstuffs: ', foodstuffs);
        this._foodstuffs.set(foodstuffs);
        this._error.set(false);
      },
      error: (error) => {
        console.error('failed to fetch foodstuffs: ', error);
        this.snackBarService.open('Lebensmittel konnten nicht geladen werden');
        this._error.set(true);
        this._loading.set(false);
      },
      complete: () => {
        this._loading.set(false);
      },
    });
  }
}
