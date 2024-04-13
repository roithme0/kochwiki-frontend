import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Foodstuff } from '../interfaces/foodstuff';
import { VerboseNames, UnitChoices } from '../interfaces/foodstuff-meta-data';

import { environment } from '../../../../environments/environment';

const backendUrl: string = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  // backend communication for ingredients
  private http: HttpClient = inject(HttpClient);

  private ingredientsSubject = new Subject<void>();
  ingredients$ = this.ingredientsSubject.asObservable();

  notifyIngredientsChanged() {
    // notify subscribers that ingredients have changed
    this.ingredientsSubject.next();
  }

  getAllIngredients(): Observable<Foodstuff[]> {
    console.debug('GET: fetching all ingredients ...');
    return this.http.get<Foodstuff[]>(backendUrl + '/ingredients');
  }

  getIngredientById(id: number): Observable<Foodstuff> {
    console.debug('GET: fetching ingredient by id "' + id + '" ...');
    return this.http.get<Foodstuff>(backendUrl + '/ingredients/' + id);
  }

  patchIngredient(
    id: number,
    updates: Partial<Foodstuff>
  ): Observable<Foodstuff> {
    console.debug('PATCH: patching ingredient "' + id + '" ...');
    return this.http.patch<Foodstuff>(
      backendUrl + '/ingredients/' + id,
      updates
    );
  }

  postIngredient(ingredient: Partial<Foodstuff>): Observable<Foodstuff> {
    console.debug('POST: posting ingredient "' + ingredient + '" ...');
    return this.http.post<Foodstuff>(backendUrl + '/ingredients', ingredient);
  }

  deleteIngredient(id: number): Observable<number> {
    console.debug('DELETE: deleting ingredient by id "' + id + '" ...');
    return this.http.delete<number>(backendUrl + '/ingredients/' + id);
  }

  fetchVerboseNames(): Observable<VerboseNames> {
    console.debug('GET: fetching ingredient verbose names ...');
    return this.http.get<VerboseNames>(
      backendUrl + '/ingredients-meta-data/verbose-names'
    );
  }

  fetchUnitChoices(): Observable<UnitChoices> {
    console.debug('GET: fetching ingredient unit choices ...');
    return this.http.get<UnitChoices>(
      backendUrl + '/ingredients-meta-data/unit-choices'
    );
  }
}
