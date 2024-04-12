import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ingredient } from '../../interfaces/ingredient';

import { IngredientService } from '../../services/ingredient.service';

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
export class IngredientDeleteDialogComponent {
  // get ingredient id from mat dialog data
  // fetch ingredient by id
  // render buttons to delete ingredient
  dialogRef: MatDialogRef<IngredientDeleteDialogComponent> =
    inject(MatDialogRef);
  ingredientService: IngredientService = inject(IngredientService);

  ingredient: Ingredient | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.ingredientService.getIngredientById(data.id).subscribe({
      next: (ingredient) => {
        console.debug('ingredient fetched: ', ingredient);
        this.ingredient = ingredient;
      },
      error: (error) => {
        console.error('failed to fetch ingredient: ', error);
      },
    });
  }

  deleteIngredient(): void {
    this.ingredient?.id
      ? this.ingredientService.deleteIngredient(this.ingredient.id).subscribe({
          next: (id) => {
            console.info('ingredient deleted: ', id);
            this.ingredientService.notifyIngredientsChanged();
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('failed to delete ingredient: ', error);
          },
        })
      : null;
  }
}
