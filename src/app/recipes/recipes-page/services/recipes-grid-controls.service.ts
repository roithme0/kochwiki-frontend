import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import { RecipesGridHelperServiceService } from './recipes-grid-helper-service.service';

import { Recipe } from '../../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipesGridControlsService {
  private recipesGridHelperService = inject(RecipesGridHelperServiceService);

  private _searchBy: WritableSignal<string> = signal('');

  set searchBy(value: string) {
    this._searchBy.set(value);
  }

  get recipes(): Signal<Recipe[]> {
    return this.recipesGridHelperService.recipes;
  }

  get searchBy(): Signal<string> {
    return this._searchBy;
  }
}
