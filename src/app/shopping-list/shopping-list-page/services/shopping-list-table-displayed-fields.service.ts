import { Injectable, inject, Signal, computed } from '@angular/core';

import { WindowWidthService } from '../../../services/window-width.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListTableDisplayedFieldsService {
  private windowWidthService = inject(WindowWidthService);

  private windowInnerWidth: Signal<number> =
    this.windowWidthService.getWindowInnerWidth();

  // adjust displayed fields based on window with
  private _displayedFields: Signal<string[]> = computed(() => {
    var displayedFields: string[] = [
      'isChecked',
      'isPinned',
      'name',
      'amount',
      'unitVerbose',
    ];
    if (this.windowInnerWidth() > 600) {
      displayedFields.push('brand');
    }
    return displayedFields;
  });

  get displayedFields(): Signal<string[]> {
    return this._displayedFields;
  }
}
