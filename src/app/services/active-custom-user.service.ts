import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import { CustomUser } from '../interfaces/custom-user';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ActiveCustomUserService {
  private snackBarService = inject(MatSnackBar);
  private cookieService = inject(CookieService);

  private _activeCustomUser: WritableSignal<CustomUser | null> = signal(null);

  constructor() {
    const user = this.cookieService.get('activeCustomUser');
    if (user) {
      try {
        this._activeCustomUser.set(JSON.parse(user));
      } catch (e) {
        console.error(e);
      }
    }
  }

  set activeCustomUser(value: CustomUser) {
    this._activeCustomUser.set(value);
    this.cookieService.set('activeCustomUser', JSON.stringify(value));
    this.snackBarService.open('Als "' + value.username + '" angemeldet', '', {
      duration: 5000,
    });
  }

  get activeCustomUser(): Signal<CustomUser | null> {
    return this._activeCustomUser;
  }
}
