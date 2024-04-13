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
// backend communication for foodstuffs
export class FoodstuffService {
  private http = inject(HttpClient);

  private foodstuffsSubject = new Subject<void>();
  foodstuffs$ = this.foodstuffsSubject.asObservable();

  notifyFoodstuffsChanged() {
    this.foodstuffsSubject.next();
  }

  getAllFoodstuffs(): Observable<Foodstuff[]> {
    console.debug('GET: fetching all foodstuffs ...');
    return this.http.get<Foodstuff[]>(backendUrl + '/foodstuffs');
  }

  getFoodstuffById(id: number): Observable<Foodstuff> {
    console.debug('GET: fetching foodstuff by id "' + id + '" ...');
    return this.http.get<Foodstuff>(backendUrl + '/foodstuffs/' + id);
  }

  patchFoodstuff(
    id: number,
    updates: Partial<Foodstuff>
  ): Observable<Foodstuff> {
    console.debug('PATCH: patching foodstuff "' + id + '" ...');
    return this.http.patch<Foodstuff>(
      backendUrl + '/foodstuffs/' + id,
      updates
    );
  }

  postFoodstuff(foodstuff: Partial<Foodstuff>): Observable<Foodstuff> {
    console.debug('POST: posting foodstuff "' + foodstuff + '" ...');
    return this.http.post<Foodstuff>(backendUrl + '/foodstuffs', foodstuff);
  }

  deleteFoodstuff(id: number): Observable<number> {
    console.debug('DELETE: deleting foodstuff by id "' + id + '" ...');
    return this.http.delete<number>(backendUrl + '/foodstuffs/' + id);
  }

  fetchVerboseNames(): Observable<VerboseNames> {
    console.debug('GET: fetching foodstuff verbose names ...');
    return this.http.get<VerboseNames>(
      backendUrl + '/foodstuffs-meta-data/verbose-names'
    );
  }

  fetchUnitChoices(): Observable<UnitChoices> {
    console.debug('GET: fetching foodstuff unit choices ...');
    return this.http.get<UnitChoices>(
      backendUrl + '/foodstuffs-meta-data/unit-choices'
    );
  }
}
