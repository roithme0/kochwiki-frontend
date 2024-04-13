import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Foodstuff } from '../../interfaces/foodstuff';

import { FoodstuffService } from '../../services/foodstuff.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-foodstuff-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './foodstuff-delete-dialog.component.html',
  styleUrl: './foodstuff-delete-dialog.component.css',
})
// get foodstuff id from mat dialog data
// fetch foodstuff by id
// render buttons to delete foodstuff
export class FoodstuffDeleteDialogComponent {
  dialogRef: MatDialogRef<FoodstuffDeleteDialogComponent> =
    inject(MatDialogRef);
  foodstuffService = inject(FoodstuffService);

  foodstuff: Foodstuff | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.foodstuffService.getFoodstuffById(data.id).subscribe({
      next: (foodstuff) => {
        console.debug('foodstuff fetched: ', foodstuff);
        this.foodstuff = foodstuff;
      },
      error: (error) => {
        console.error('failed to fetch foodstuff: ', error);
      },
    });
  }

  deleteFoodstuff(): void {
    this.foodstuff?.id
      ? this.foodstuffService.deleteFoodstuff(this.foodstuff.id).subscribe({
          next: (id) => {
            console.info('foodstuff deleted: ', id);
            this.foodstuffService.notifyFoodstuffsChanged();
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('failed to delete foodstuff: ', error);
          },
        })
      : null;
  }
}
