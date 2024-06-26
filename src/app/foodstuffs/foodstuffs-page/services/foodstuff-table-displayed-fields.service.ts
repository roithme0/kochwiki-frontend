import { Injectable, inject, Signal, computed } from '@angular/core';

import { WindowWidthService } from '../../../services/window-width.service';

@Injectable({
  providedIn: 'root',
})
export class FoodstuffTableDisplayedFieldsService {
  private windowWidthService = inject(WindowWidthService);

  private windowInnerWidth: Signal<number> =
    this.windowWidthService.getWindowInnerWidth();

  // adjust displayed fields based on window with
  private _displayedFields: Signal<string[]> = computed(() => {
    var displayedFields: string[] = ['name', 'brand'];
    if (this.windowInnerWidth() > 600) {
      displayedFields.push('kcal');
    }
    if (this.windowInnerWidth() > 1100) {
      displayedFields.push('carbs', 'protein', 'fat');
    }
    if (this.windowInnerWidth() > 1200) {
      displayedFields.push('unitVerbose');
    }
    displayedFields.push('edit', 'delete');
    return displayedFields;
  });

  get displayedFields(): Signal<string[]> {
    return this._displayedFields;
  }
}
