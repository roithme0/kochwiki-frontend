import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import { Foodstuff } from '../../interfaces/foodstuff';

import { FoodstuffTableHelperServiceService } from './foodstuff-table-helper-service.service';

@Injectable({
  providedIn: 'root',
})
export class FoodstuffTableControlServiceService {
  foodstuffTableHelperService = inject(FoodstuffTableHelperServiceService);

  private _searchBy: WritableSignal<string> = signal('');
  private _filterBy: WritableSignal<string> = signal('all');

  set searchBy(value: string) {
    this._searchBy.set(value);
  }

  set filterBy(value: string) {
    if (value === undefined || value === null) {
      this._filterBy.set('all');
      return;
    }
    this._filterBy.set(value);
  }

  get searchBy(): Signal<string> {
    return this._searchBy;
  }

  get filterBy(): Signal<string> {
    return this._filterBy;
  }

  get foodstuffs(): Signal<Foodstuff[]> {
    return this.foodstuffTableHelperService.foodstuffs;
  }
}
