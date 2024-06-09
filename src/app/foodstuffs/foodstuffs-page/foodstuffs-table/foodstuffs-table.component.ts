import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Foodstuff } from '../../interfaces/foodstuff';
import { FoodstuffVerboseNames } from '../../interfaces/foodstuff-meta-data';

import { FoodstuffTableDisplayedFieldsService } from '../services/foodstuff-table-displayed-fields.service';
import { FoodstuffTableDisplayedFoodstuffsService } from '../services/foodstuff-table-displayed-foodstuffs.service';
import { FoodstuffsService } from '../services/foodstuffs.service';

import { FoodstuffPatchDialogComponent } from '../../dialogs/foodstuff-patch-dialog/foodstuff-patch-dialog.component';
import { FoodstuffDeleteDialogComponent } from '../../dialogs/foodstuff-delete-dialog/foodstuff-delete-dialog.component';

@Component({
  selector: 'app-foodstuffs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './foodstuffs-table.component.html',
  styleUrl: './foodstuffs-table.component.css',
})
export class FoodstuffsTableComponent {
  //#region services

  displayedFieldsService = inject(FoodstuffTableDisplayedFieldsService);
  displayedFoodstuffsService = inject(FoodstuffTableDisplayedFoodstuffsService);
  foodstuffsService = inject(FoodstuffsService);
  dialog = inject(MatDialog);

  //#endregion

  //#region fields

  verboseNames: Signal<FoodstuffVerboseNames | null> =
    this.foodstuffsService.verboseNames;

  displayedFoodstuffs: Signal<Foodstuff[]> =
    this.displayedFoodstuffsService.displayedFoodstuffs;
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;
  displayedVerboseNames: Signal<FoodstuffVerboseNames> = computed(() => {
    const verboseNames: FoodstuffVerboseNames | null = this.verboseNames();
    if (verboseNames == null) {
      return {
        name: 'Name',
        brand: 'Marke',
        unit: 'Einheit',
        kcal: 'Kalorien',
        carbs: 'Kohlenhydrate',
        protein: 'Protein',
        fat: 'Fett',
      };
    }
    return verboseNames;
  });

  //#endregion

  //#region methods

  openEditFoodstuffDialog(foodstuff: Foodstuff): void {
    this.dialog.open(FoodstuffPatchDialogComponent, {
      data: { id: foodstuff.id },
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
      disableClose: true,
    });
  }

  openDeleteFoodstuffDialog(foodstuff: Foodstuff): void {
    this.dialog.open(FoodstuffDeleteDialogComponent, {
      data: { id: foodstuff.id },
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
    });
  }

  //#endregion
}
