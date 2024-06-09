import {
  Injectable,
  Signal,
  WritableSignal,
  signal,
  inject,
} from '@angular/core';

import { Foodstuff } from '../../interfaces/foodstuff';
import {
  FoodstuffUnitChoices,
  FoodstuffVerboseNames,
} from '../../interfaces/foodstuff-meta-data';

import { FoodstuffBackendService } from '../../services/foodstuff-backend.service';
import { SnackBarService } from '../../../services/snack-bar.service';

import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// reduces backend calls
export class FoodstuffsService {
  //#region services

  private foodstuffBackendService = inject(FoodstuffBackendService);
  private snackBarService = inject(SnackBarService);

  //#endregion

  //#region fields

  private _foodstuffs: WritableSignal<Foodstuff[]> = signal([]);
  private _verboseNames: WritableSignal<FoodstuffVerboseNames | null> =
    signal(null);
  private _unitChoices: WritableSignal<FoodstuffUnitChoices | null> =
    signal(null);

  private _isLoading: WritableSignal<boolean> = signal(true);
  private _hasError: WritableSignal<boolean> = signal(false);

  //#endregion

  constructor() {
    this.foodstuffBackendService.foodstuffs$.subscribe(() => {
      this.fetchFoodstuffs();
    });

    this.fetchFoodstuffs();
  }

  //#region getters

  get isLoading(): Signal<boolean> {
    return this._isLoading;
  }

  get hasError(): Signal<boolean> {
    return this._hasError;
  }

  get foodstuffs(): Signal<Foodstuff[]> {
    return this._foodstuffs;
  }

  get verboseNames(): Signal<FoodstuffVerboseNames | null> {
    return this._verboseNames;
  }

  get unitChoices(): Signal<FoodstuffUnitChoices | null> {
    return this._unitChoices;
  }

  //#endregion

  //#region utilities

  private async fetchFoodstuffs() {
    this._isLoading.set(true);
    this._hasError.set(false);

    const requests: Observable<any> = forkJoin({
      foodstuffs: this.foodstuffBackendService.getAllFoodstuffs(),
      verboseNames: this.foodstuffBackendService.fetchFoodstuffVerboseNames(),
      unitChoices: this.foodstuffBackendService.fetchFoodstuffUnitChoices(),
    });

    requests.subscribe({
      next: ({ foodstuffs, verboseNames, unitChoices }) => {
        console.debug('fetched foodstuffs: ', foodstuffs);
        console.debug('fetched verbose names: ', verboseNames);
        console.debug('fetched unit choices: ', unitChoices);
        this._foodstuffs.set(foodstuffs);
        this._verboseNames.set(verboseNames);
        this._unitChoices.set(unitChoices);
        this._hasError.set(false);
      },
      error: (error) => {
        console.error(
          'failed to fetch foodstuffs, verbose names or unit choices: ',
          error
        );
        this.snackBarService.open('Zutaten konnten nicht geladen werden');
        this._hasError.set(true);
        this._isLoading.set(false);
      },
    });
  }

  //#endregion
}
