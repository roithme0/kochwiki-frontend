import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Foodstuff } from '../../shared/interfaces/foodstuff';

import { FoodstuffPatchDialogComponent } from '../../shared/dialogs/foodstuff-patch-dialog/foodstuff-patch-dialog.component';
import { FoodstuffDeleteDialogComponent } from '../../shared/dialogs/foodstuff-delete-dialog/foodstuff-delete-dialog.component';

@Component({
  selector: 'app-ingredients-grid-row',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './ingredients-grid-row.component.html',
  styleUrl: './ingredients-grid-row.component.css',
})
// render foodstuff data
// render foodstuff buttons
export class IngredientsGridRowComponent {
  @Input() ingredient: Foodstuff | undefined;
  @Input() displayedFields: string[] = [];

  dialog: MatDialog = inject(MatDialog);

  openEditIngredientDialog(): void {
    this.dialog.open(FoodstuffPatchDialogComponent, {
      data: { id: this.ingredient?.id },
    });
  }

  openDeleteIngredientDialog(): void {
    this.dialog.open(FoodstuffDeleteDialogComponent, {
      data: { id: this.ingredient?.id },
    });
  }
}
