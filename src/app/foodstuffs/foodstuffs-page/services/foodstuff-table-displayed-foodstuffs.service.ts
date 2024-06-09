import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';

import { Foodstuff } from '../../interfaces/foodstuff';

import { FoodstuffTableHelperService } from './foodstuff-table-helper.service';
import { FoodstuffTableControlService } from './foodstuff-table-control.service';

@Injectable({
  providedIn: 'root',
})
export class FoodstuffTableDisplayedFoodstuffsService {
  //#region services

  private foodstuffTableHelperService = inject(FoodstuffTableHelperService);
  private foodstuffsTableControlsService = inject(FoodstuffTableControlService);

  //#endregion

  //#region fields

  private _foodstuffs: Signal<Foodstuff[]> =
    this.foodstuffTableHelperService.foodstuffs;
  private _displayedFoodstuffs: Signal<Foodstuff[]> = computed(() => {
    var displayedFoodstuffs = this._foodstuffs();
    displayedFoodstuffs =
      this.searchFoodstuffsByNameOrBrand(displayedFoodstuffs);
    displayedFoodstuffs = this.filterFoodstuffsByUnit(displayedFoodstuffs);
    return displayedFoodstuffs;
  });

  private _searchBy: Signal<string> =
    this.foodstuffsTableControlsService.searchBy;
  private _filterBy: Signal<string> =
    this.foodstuffsTableControlsService.filterBy;

  //#endregion

  //#region getters

  get displayedFoodstuffs(): Signal<Foodstuff[]> {
    return this._displayedFoodstuffs;
  }

  //#endregion

  //#region utilities

  private searchFoodstuffsByNameOrBrand(foodstuffs: Foodstuff[]): Foodstuff[] {
    const _searchBy: string = this._searchBy();
    console.debug('searching foodstuffs by: ', _searchBy);
    if (_searchBy === '') {
      return foodstuffs;
    }
    return foodstuffs.filter((foodstuff) => {
      return (
        foodstuff.name.toLowerCase().includes(_searchBy.toLowerCase()) ||
        foodstuff.brand?.toLowerCase().includes(_searchBy.toLowerCase())
      );
    });
  }

  private filterFoodstuffsByUnit(foodstuffs: Foodstuff[]): Foodstuff[] {
    const _filterBy: string = this._filterBy();
    console.debug('filtering foodstuffs by: ', _filterBy);
    if (_filterBy === 'all') {
      return foodstuffs;
    }
    return foodstuffs.filter((foodstuff) => {
      return foodstuff.unit === _filterBy;
    });
  }

  //#endregion
}
