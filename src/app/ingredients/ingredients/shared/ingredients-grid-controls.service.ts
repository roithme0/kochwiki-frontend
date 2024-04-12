import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridControlsService {
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
}
