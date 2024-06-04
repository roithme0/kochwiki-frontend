import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

import { CustomUser } from '../interfaces/custom-user';

@Injectable({
  providedIn: 'root',
})
export class ActiveCustomUserService {
  private _activeCustomUser: WritableSignal<CustomUser | null> = signal(null);

  set activeCustomUser(value: CustomUser) {
    this._activeCustomUser.set(value);
  }

  get activeCustomUser(): Signal<CustomUser | null> {
    return this._activeCustomUser;
  }
}
