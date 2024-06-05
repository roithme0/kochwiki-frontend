import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ShoppingList } from '../interfaces/shopping-list';

import { environment } from '../../../environments/environment';

const backendUrl = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class ShoppingListBackendService {
  private http = inject(HttpClient);

  getShoppingListByCustomUserId(
    customUserId: number
  ): Observable<ShoppingList> {
    console.info(
      'GET: fetching shoppingList by customUser id "' + customUserId + '" ...'
    );
    return this.http.get<ShoppingList>(
      backendUrl + '/shoppingLists/' + customUserId
    );
  }
}
