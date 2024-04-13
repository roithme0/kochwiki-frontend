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

import { IngredientCreateDialogComponent } from '../../shared/dialogs/foodstuff-create-dialog/foodstuff-create-dialog.component';

import { FoodstuffsGridDisplayedIngredientsService } from '../services/foodstuff-grid-displayed-ingredients.service';
import { FoodstuffsGridDisplayedFieldsService } from '../services/foodstuff-grid-displayed-fields.service';

@Component({
  selector: 'app-ingredients-grid',
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
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
// render foodstuffs-grid-controls component
// render foodstuffs as grid
export class IngredientsGridComponent {
  dialog = inject(MatDialog);
  displayedIngredientsService = inject(
    FoodstuffsGridDisplayedIngredientsService
  );
  displayedFieldsService = inject(FoodstuffsGridDisplayedFieldsService);

  displayedIngredients: Signal<Foodstuff[]> =
    this.displayedIngredientsService.displayedFoodstuffs;
  loadingDisplayedIngredients: Signal<boolean> =
    this.displayedIngredientsService.loading;
  errorLoadingDisplayedIngredients: Signal<boolean> =
    this.displayedIngredientsService.error;
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;

  openCreateIngredientDialog(): void {
    this.dialog.open(IngredientCreateDialogComponent);
  }
}
