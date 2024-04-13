import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Foodstuff } from '../../shared/interfaces/foodstuff';

import { FoodstuffPatchDialogComponent } from '../../shared/dialogs/foodstuff-patch-dialog/foodstuff-patch-dialog.component';
import { FoodstuffDeleteDialogComponent } from '../../shared/dialogs/foodstuff-delete-dialog/foodstuff-delete-dialog.component';

@Component({
  selector: 'app-foodstuffs-grid-row',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './foodstuffs-grid-row.component.html',
  styleUrl: './foodstuffs-grid-row.component.css',
})
// render foodstuff data
// render foodstuff buttons
export class FoodstuffsGridRowComponent {
  @Input() foodstuff: Foodstuff | undefined;
  @Input() displayedFields: string[] = [];

  dialog = inject(MatDialog);

  openEditIngredientDialog(): void {
    this.dialog.open(FoodstuffPatchDialogComponent, {
      data: { id: this.foodstuff?.id },
    });
  }

  openDeleteIngredientDialog(): void {
    this.dialog.open(FoodstuffDeleteDialogComponent, {
      data: { id: this.foodstuff?.id },
    });
  }
}
