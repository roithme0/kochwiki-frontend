import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../interfaces/recipe';

import { Observable, Subject } from 'rxjs';

import { environment } from '../../../../environments/environment';

const backendUrl: string = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // backend communication associated with recipes
  private http: HttpClient = inject(HttpClient);

  private recipesSubject = new Subject<void>();
  recipes$ = this.recipesSubject.asObservable();

  notifyRecipesChanged() {
    this.recipesSubject.next();
  }

  getAllRecipes(): Observable<Recipe[]> {
    console.debug('GET: fetching all recipes');
    return this.http.get<Recipe[]>(backendUrl + '/recipes');
  }

  getRecipeById(id: number): Observable<Recipe> {
    console.debug('GET: fetching recipe by id', id);
    return this.http.get<Recipe>(backendUrl + '/recipes/' + id);
  }

  patchRecipe(id: number, updates: Partial<Recipe>): Observable<Recipe> {
    console.debug('PATCH: patching recipe ' + id, updates);
    return this.http.patch<Recipe>(backendUrl + '/recipes/' + id, updates);
  }

  postRecipe(recipe: Partial<Recipe>): Observable<Recipe> {
    console.debug('POST: posting recipe ', recipe);
    return this.http.post<Recipe>(backendUrl + '/recipes', recipe);
  }

  deleteRecipe(id: number): Observable<number> {
    console.debug('DELETE: deleting recipe ' + id);
    return this.http.delete<number>(backendUrl + '/recipes/' + id);
  }
}
