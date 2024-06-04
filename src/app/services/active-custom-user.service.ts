import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import { CustomUser } from '../interfaces/custom-user';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ActiveCustomUserService {
  private snackBarService = inject(MatSnackBar);

  private _activeCustomUser: WritableSignal<CustomUser | null> = signal(null);

  set activeCustomUser(value: CustomUser) {
    this._activeCustomUser.set(value);
    this.snackBarService.open('Als "' + value.username + '" angemeldet', '', {
      duration: 5000,
    });
  }

  get activeCustomUser(): Signal<CustomUser | null> {
    return this._activeCustomUser;
  }
}
