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

  //#endregion

  constructor() {
    effect(() => {
      const activeCustomUser: CustomUser | null = this._activeCustomUser();
      if (activeCustomUser == null) {
        this._shoppingList.set(null);
        return;
      }
      this.fetchShoppingList(activeCustomUser.id);
    });
  }

  //#region getters

  get shoppingList(): Signal<ShoppingList | null> {
    return this._shoppingList;
  }

  //#endregion

  //#region utilities

  private fetchShoppingList(customUserId: number): void {
    this.shoppingListBackendService
      .getShoppingListByCustomUserId(customUserId)
      .subscribe((shoppingList) => {
        this._shoppingList.set(shoppingList);
      });
  }

  //#endregion
}
