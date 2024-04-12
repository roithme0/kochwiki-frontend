import { Injectable, inject, Signal, computed } from '@angular/core';

import { WindowWidthService } from '../../../shared/services/window-width.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridDisplayedFieldsService {
  private windowWidthService: WindowWidthService = inject(WindowWidthService);

  private windowInnerWidth: Signal<number> =
    this.windowWidthService.getWindowInnerWidth();

  private _displayedFields: Signal<string[]> = computed(() => {
    // adjust displayed fields based on window with
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
    return displayedFields;
  });

  get displayedFields(): Signal<string[]> {
    return this._displayedFields;
  }
}
