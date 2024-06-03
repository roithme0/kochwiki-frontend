import { Injectable, WritableSignal, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  private _headline: WritableSignal<string> = signal('');
  private _back: WritableSignal<string> = signal('');
  private _showBack: WritableSignal<boolean> = signal(true)

  set headline(value: string) {
    this._headline.set(value);
  }

  set back(value: string) {
    this._back.set(value);
  }

  set showBack(value: boolean){
    this._showBack.set(value)
  }

  get headline(): Signal<string> {
    return this._headline;
  }

  get back(): Signal<string> {
    return this._back;
  }

  get showBack(): Signal<boolean>{
    return this._showBack
  }
}
