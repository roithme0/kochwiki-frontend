import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { CustomUser } from '../interfaces/custom-user';

import { environment } from '../../environments/environment';

const backendUrl: string = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class CustomUserBackendService {
  private http = inject(HttpClient);

  private customUsersSubject = new Subject<void>();
  customUsers$ = this.customUsersSubject.asObservable();

  notifyCustomUsersChanged() {
    this.customUsersSubject.next();
  }

  getAllCustomUsers(): Observable<CustomUser[]> {
    console.debug('GET: fetching all customUsers');
    return this.http.get<CustomUser[]>(backendUrl + '/users');
  }

  getCustomUserByUsername(username: string): Observable<CustomUser> {
    console.debug('GET: fetching customUsers by username', username);
    return this.http.get<CustomUser>(backendUrl + '/users/' + username);
  }

  postCustomUser(customUser: Partial<CustomUser>): Observable<CustomUser> {
    console.debug('POST: creating customUser', customUser);
    return this.http.post<CustomUser>(backendUrl + '/users', customUser);
  }
}
