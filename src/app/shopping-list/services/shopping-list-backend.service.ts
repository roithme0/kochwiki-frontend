import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ShoppingList } from '../interfaces/shopping-list';
import { CustomUser } from '../../interfaces/custom-user';

import { ActiveCustomUserService } from '../../services/active-custom-user.service';

import { environment } from '../../../environments/environment';
import { Ingredient } from '../../recipes/interfaces/ingredient';

const backendUrl = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class ShoppingListBackendService {
  private http = inject(HttpClient);
  private activeCustomUserService = inject(ActiveCustomUserService);

  activeCustomUser: Signal<CustomUser | null> =
    this.activeCustomUserService.activeCustomUser;

  public getShoppingListByCustomUserId(
    customUserId: number
  ): Observable<ShoppingList> {
    console.info(
      'GET: fetching shoppingList by customUser id "' + customUserId + '" ...'
    );
    return this.http.get<ShoppingList>(
      backendUrl + '/shoppingLists/' + customUserId
    );
  }

  public addIngredient(
    ingredient: Ingredient,
    servings: number
  ): Observable<ShoppingList> {
    console.info('POST: adding ingredient to shoppingList ...');

    const activeCustomUser: CustomUser | null = this.activeCustomUser();
    if (activeCustomUser === null) {
      console.error('No active custom user found.');
      return new Observable<ShoppingList>();
    }

    return this.http.patch<ShoppingList>(
      backendUrl +
        '/shoppingLists/' +
        activeCustomUser.id +
        '/addIngredient/' +
        ingredient.id,
      ingredient.amount * servings
    );
  }
}
