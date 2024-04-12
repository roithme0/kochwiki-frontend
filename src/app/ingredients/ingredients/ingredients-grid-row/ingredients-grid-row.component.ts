import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Ingredient } from '../../shared/interfaces/ingredient';

import { IngredientPatchDialogComponent } from '../../shared/dialogs/ingredient-patch-dialog/ingredient-patch-dialog.component';
import { IngredientDeleteDialogComponent } from '../../shared/dialogs/ingredient-delete-dialog/ingredient-delete-dialog.component';

@Component({
  selector: 'app-ingredients-grid-row',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './ingredients-grid-row.component.html',
  styleUrl: './ingredients-grid-row.component.css',
})
export class IngredientsGridRowComponent {
  // render ingredient data
  // render ingredient buttons
  @Input() ingredient: Ingredient | undefined;
  @Input() displayedFields: string[] = [];

  dialog: MatDialog = inject(MatDialog);

  openEditIngredientDialog(): void {
    this.dialog.open(IngredientPatchDialogComponent, {
      data: { id: this.ingredient?.id },
    });
  }

  openDeleteIngredientDialog(): void {
    this.dialog.open(IngredientDeleteDialogComponent, {
      data: { id: this.ingredient?.id },
    });
  }
}
