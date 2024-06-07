import {
  Injectable,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';

import { ShoppingListBackendService } from '../../services/shopping-list-backend.service';
import { ActiveCustomUserService } from '../../../services/active-custom-user.service';

import { CustomUser } from '../../../interfaces/custom-user';
import { ShoppingList } from '../../interfaces/shopping-list';
import { forkJoin } from 'rxjs';
import { ShoppingListItemVerboseNames } from '../../interfaces/shopping-list-meta-data';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListTableHelperService {
  //#region service

  private shoppingListBackendService = inject(ShoppingListBackendService);
  private activeCustomUserService = inject(ActiveCustomUserService);

  //#endregion

  //#region fields

  private _activeCustomUser: Signal<CustomUser | null> =
    this.activeCustomUserService.activeCustomUser;
  private _shoppingList: WritableSignal<ShoppingList | null> = signal(null);
  private _shoppingListItemVerboseNames: WritableSignal<ShoppingListItemVerboseNames | null> =
    signal(null);

  private _isLoading: WritableSignal<boolean> = signal(false);
  private _hasError: WritableSignal<boolean> = signal(false);

  //#endregion

  constructor() {
    effect(
      () => {
        const activeCustomUser: CustomUser | null = this._activeCustomUser();
        if (activeCustomUser == null) {
          this._shoppingList.set(null);
          return;
        }
        this.fetchShoppingList(activeCustomUser.id);
      },
      { allowSignalWrites: true }
    );
  }

  //#region getters

  get shoppingList(): Signal<ShoppingList | null> {
    return this._shoppingList;
  }

  get shoppingListItemVerboseNames(): Signal<ShoppingListItemVerboseNames | null> {
    return this._shoppingListItemVerboseNames;
  }

  get isLoading(): Signal<boolean> {
    return this._isLoading;
  }

  get hasError(): Signal<boolean> {
    return this._hasError;
  }

  //#endregion

  //#region utilities

  private fetchShoppingList(customUserId: number): void {
    this._isLoading.set(true);
    this._hasError.set(false);

    forkJoin({
      shoppingList:
        this.shoppingListBackendService.getShoppingListByCustomUserId(
          customUserId
        ),
      shoppingListItemVerboseNames:
        this.shoppingListBackendService.fetchShoppingItemVerboseNames(),
    }).subscribe({
      next: ({ shoppingList, shoppingListItemVerboseNames }) => {
        this._shoppingList.set(shoppingList);
        this._shoppingListItemVerboseNames.set(shoppingListItemVerboseNames);
        this._isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error fetching shopping list:', error);
        this._hasError.set(true);
        this._isLoading.set(false);
      },
    });
  }

  //#endregion
}
