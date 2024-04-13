import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Foodstuff } from '../../interfaces/foodstuff';

import { FoodstuffService } from '../../services/foodstuff.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ingredient-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './ingredient-delete-dialog.component.html',
  styleUrl: './ingredient-delete-dialog.component.css',
})
// get foodstuff id from mat dialog data
// fetch foodstuff by id
// render buttons to delete foodstuff
export class IngredientDeleteDialogComponent {
  dialogRef: MatDialogRef<IngredientDeleteDialogComponent> =
    inject(MatDialogRef);
  ingredientService = inject(FoodstuffService);

  ingredient: Foodstuff | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.ingredientService.getFoodstuffById(data.id).subscribe({
      next: (foodstuff) => {
        console.debug('foodstuff fetched: ', foodstuff);
        this.ingredient = foodstuff;
      },
      error: (error) => {
        console.error('failed to fetch foodstuff: ', error);
      },
    });
  }

  deleteIngredient(): void {
    this.ingredient?.id
      ? this.ingredientService.deleteFoodstuff(this.ingredient.id).subscribe({
          next: (id) => {
            console.info('foodstuff deleted: ', id);
            this.ingredientService.notifyFoodstuffsChanged();
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('failed to delete foodstuff: ', error);
          },
        })
      : null;
  }
}
