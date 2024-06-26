import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ShoppingList } from '../interfaces/shopping-list';
import { CustomUser } from '../../interfaces/custom-user';

import { ActiveCustomUserService } from '../../services/active-custom-user.service';

import { environment } from '../../../environments/environment';

import { Ingredient } from '../../recipes/interfaces/ingredient';
import { ShoppingListItemIngredient } from '../interfaces/shopping-list-item-ingredient';
import { ShoppingListItemVerboseNames } from '../interfaces/shopping-list-meta-data';

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
    console.info('PATCH: adding ingredient to shoppingList ...');

    const activeCustomUser: CustomUser | null = this.activeCustomUser();
    if (activeCustomUser === null) {
      console.error('No active custom user found.');
      return new Observable<ShoppingList>();
    }

    return this.http.patch<ShoppingList>(
      backendUrl + '/shoppingLists/addIngredient',
      {
        customUserId: activeCustomUser.id,
        ingredientId: ingredient.id,
        amount: ingredient.amount * servings,
      }
    );
  }

  public removeIngredient(ingredient: Ingredient): Observable<ShoppingList> {
    console.info('PATCH: removing ingredient from shoppingList ...');

    const activeCustomUser: CustomUser | null = this.activeCustomUser();
    if (activeCustomUser === null) {
      console.error('No active custom user found.');
      return new Observable<ShoppingList>();
    }

    return this.http.patch<ShoppingList>(
      backendUrl + '/shoppingLists/removeIngredient',
      {
        customUserId: activeCustomUser.id,
        ingredientId: ingredient.id,
      }
    );
  }

  public setIsChecked(
    itemIngredient: ShoppingListItemIngredient,
    newIsChecked: boolean
  ): Observable<ShoppingListItemIngredient> {
    console.info(
      'PATCH: setting isChecked of shoppingItemIngredient of shoppingList ...'
    );

    const activeCustomUser: CustomUser | null = this.activeCustomUser();
    if (activeCustomUser === null) {
      console.error('No active custom user found.');
      return new Observable<ShoppingListItemIngredient>();
    }

    return this.http.patch<ShoppingListItemIngredient>(
      backendUrl + '/shoppingLists/ingredientIsChecked',
      {
        customUserId: activeCustomUser.id,
        itemIngredientId: itemIngredient.id,
        isChecked: newIsChecked,
      }
    );
  }

  public setIsPinned(
    itemIngredient: ShoppingListItemIngredient,
    newIsPinned: boolean
  ): Observable<ShoppingListItemIngredient> {
    console.info(
      'PATCH: setting isPinned of shoppingItemIngredient of shoppingList ...'
    );

    const activeCustomUser: CustomUser | null = this.activeCustomUser();
    if (activeCustomUser === null) {
      console.error('No active custom user found.');
      return new Observable<ShoppingListItemIngredient>();
    }

    return this.http.patch<ShoppingListItemIngredient>(
      backendUrl + '/shoppingLists/ingredientIsPinned',
      {
        customUserId: activeCustomUser.id,
        itemIngredientId: itemIngredient.id,
        isPinned: newIsPinned,
      }
    );
  }

  public clearChecked(): Observable<ShoppingList> {
    console.info('PATCH: clearing checked items of shoppingList ...');

    const activeCustomUser: CustomUser | null = this.activeCustomUser();
    if (activeCustomUser === null) {
      console.error('No active custom user found.');
      return new Observable<ShoppingList>();
    }

    return this.http.patch<ShoppingList>(
      backendUrl + '/shoppingLists/clearChecked',
      activeCustomUser.id
    );
  }

  fetchShoppingItemVerboseNames(): Observable<ShoppingListItemVerboseNames> {
    console.debug('GET: fetching itemIngredient verbose names ...');
    return this.http.get<ShoppingListItemVerboseNames>(
      backendUrl + '/shopping-list-item-meta-data/verbose-names'
    );
  }
}
