import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import { CustomUser } from '../interfaces/custom-user';

import { CookieService } from 'ngx-cookie-service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveCustomUserService {
  private cookieService = inject(CookieService);
  private snackBarService = inject(SnackBarService);

  private _activeCustomUser: WritableSignal<CustomUser | null> = signal(null);

  constructor() {
    const user = this.cookieService.get('activeCustomUser');
    if (user) {
      try {
        this.activeCustomUser = JSON.parse(user);
      } catch (e) {
        console.error(e);
      }
    }
  }

  set activeCustomUser(value: CustomUser) {
    this._activeCustomUser.set(value);
    this.cookieService.set('activeCustomUser', JSON.stringify(value));
    this.snackBarService.open('Als ' + value.username + ' angemeldet');
  }

  get activeCustomUser(): Signal<CustomUser | null> {
    return this._activeCustomUser;
  }

  public logout(): void {
    this._activeCustomUser.set(null);
    this.cookieService.delete('activeCustomUser');
    this.snackBarService.open('Abgemeldet');
  }
}
