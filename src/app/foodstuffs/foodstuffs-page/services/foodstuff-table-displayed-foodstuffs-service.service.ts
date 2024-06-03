import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';

import { Foodstuff } from '../../interfaces/foodstuff';

import { FoodstuffTableHelperServiceService } from './foodstuff-table-helper-service.service';
import { FoodstuffTableControlServiceService } from './foodstuff-table-control-service.service';

@Injectable({
  providedIn: 'root',
})
export class FoodstuffTableDisplayedFoodstuffsServiceService {
  private foodstuffTableHelperService = inject(
    FoodstuffTableHelperServiceService
  );
  private foodstuffsTableControlsService = inject(
    FoodstuffTableControlServiceService
  );

  private _foodstuffs: Signal<Foodstuff[]> =
    this.foodstuffTableHelperService.foodstuffs;
  // apply search & filter functions to foodstuffs
  private _displayedFoodstuffs: Signal<Foodstuff[]> = computed(() => {
    var displayedFoodstuffs = this._foodstuffs();
    displayedFoodstuffs =
      this.searchFoodstuffsByNameOrBrand(displayedFoodstuffs);
    displayedFoodstuffs = this.filterFoodstuffsByUnit(displayedFoodstuffs);
    return displayedFoodstuffs;
  });

  private searchBy: Signal<string> =
    this.foodstuffsTableControlsService.searchBy;
  private filterBy: Signal<string> =
    this.foodstuffsTableControlsService.filterBy;

  get displayedFoodstuffs(): Signal<Foodstuff[]> {
    return this._displayedFoodstuffs;
  }

  get loading(): Signal<boolean> {
    return this.foodstuffTableHelperService.loading;
  }

  get error(): Signal<boolean> {
    return this.foodstuffTableHelperService.error;
  }

  private searchFoodstuffsByNameOrBrand(foodstuffs: Foodstuff[]): Foodstuff[] {
    const searchBy: string = this.searchBy();
    console.debug('searching foodstuffs by: ', searchBy);
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
    console.debug('filtering foodstuffs by: ', filterBy);
    if (filterBy === 'all') {
      return foodstuffs;
    }
    return foodstuffs.filter((foodstuff) => {
      return foodstuff.unit === filterBy;
    });
  }
}
