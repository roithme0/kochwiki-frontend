import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FoodstuffsGridControlsComponent } from '../foodstuffs-grid-controls/foodstuffs-grid-controls.component';
import { FoodstuffsGridHeaderComponent } from '../foodstuffs-grid-header/foodstuffs-grid-header.component';
import { FoodstuffsGridRowComponent } from '../foodstuffs-grid-row/foodstuffs-grid-row.component';

import { Foodstuff } from '../../shared/interfaces/foodstuff';

import { FoodstuffCreateDialogComponent } from '../../shared/dialogs/foodstuff-create-dialog/foodstuff-create-dialog.component';

import { FoodstuffsGridDisplayedFoodstuffsService } from '../services/foodstuff-grid-displayed-foodstuffs.service';
import { FoodstuffsGridDisplayedFieldsService } from '../services/foodstuff-grid-displayed-fields.service';

@Component({
  selector: 'app-foodstuffs-grid',
  standalone: true,
  imports: [
    CommonModule,
    FoodstuffsGridControlsComponent,
    FoodstuffsGridHeaderComponent,
    FoodstuffsGridRowComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './foodstuffs-grid.component.html',
  styleUrl: './foodstuffs-grid.component.css',
})
// render foodstuffs-grid-controls component
// render foodstuffs as grid
export class FoodstuffsGridComponent {
  dialog = inject(MatDialog);

  displayedFoodstuffsService = inject(FoodstuffsGridDisplayedFoodstuffsService);
  displayedFieldsService = inject(FoodstuffsGridDisplayedFieldsService);

  displayedFoodstuffs: Signal<Foodstuff[]> =
    this.displayedFoodstuffsService.displayedFoodstuffs;
  loadingDisplayedFoodstuffs: Signal<boolean> =
    this.displayedFoodstuffsService.loading;
  errorLoadingDisplayedFoodstuffs: Signal<boolean> =
    this.displayedFoodstuffsService.error;
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;

  openCreateFoodstuffDialog(): void {
    this.dialog.open(FoodstuffCreateDialogComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
      disableClose: true,
    });
  }
}
