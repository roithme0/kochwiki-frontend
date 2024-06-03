import {
  Injectable,
  WritableSignal,
  signal,
  Signal,
  afterRender,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowWidthService {
  private windowInnerWidth: WritableSignal<number> = signal(360);

  constructor() {
    afterRender(() => {
      this.windowInnerWidth.set(window.innerWidth);
      window.addEventListener('resize', this.windowEventListener);
    });
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.windowEventListener);
    }
  }

  getWindowInnerWidth(): Signal<number> {
    return this.windowInnerWidth;
  }

  private windowEventListener = (): void => {
    this.windowInnerWidth.set(window.innerWidth);
  };
}
