import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Foodstuff } from '../../interfaces/foodstuff';
import { FoodstuffVerboseNames } from '../../interfaces/foodstuff-meta-data';

import { FoodstuffTableDisplayedFieldsService } from '../services/foodstuff-table-displayed-fields.service';
import { FoodstuffTableDisplayedFoodstuffsService } from '../services/foodstuff-table-displayed-foodstuffs.service';
import { FoodstuffBackendService } from '../../services/foodstuff-backend.service';

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
  displayedFieldsService = inject(FoodstuffTableDisplayedFieldsService);
  displayedFoodstuffsService = inject(FoodstuffTableDisplayedFoodstuffsService);
  foodstuffBackendService = inject(FoodstuffBackendService);
  dialog = inject(MatDialog);

  verboseNames: FoodstuffVerboseNames | null = null;

  displayedFoodstuffs: Signal<Foodstuff[]> =
    this.displayedFoodstuffsService.displayedFoodstuffs;
  loadingDisplayedFoodstuffs: Signal<boolean> =
    this.displayedFoodstuffsService.loading;
  errorLoadingDisplayedFoodstuffs: Signal<boolean> =
    this.displayedFoodstuffsService.error;
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;

  ngOnInit(): void {
    this.fetchFoodstuffVerboseNames();
  }

  fetchFoodstuffVerboseNames(): void {
    this.foodstuffBackendService.fetchFoodstuffVerboseNames().subscribe({
      next: (verboseNames) => {
        console.debug('fetched foodstuff verbose names: ', verboseNames);
        this.verboseNames = verboseNames;
      },
      error: (error) => {
        console.error('failed to fetch foodstuff verbose names: ', error);
      },
    });
  }

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
}
