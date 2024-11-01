import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Foodstuff } from '../../interfaces/foodstuff';

import { FoodstuffBackendService } from '../../services/foodstuff-backend.service';
import { SnackBarService } from '../../../services/snack-bar.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-foodstuff-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DialogHeaderComponent,
  ],
  templateUrl: './foodstuff-delete-dialog.component.html',
  styleUrl: './foodstuff-delete-dialog.component.css',
})
export class FoodstuffDeleteDialogComponent {
  dialogRef = inject(MatDialogRef);
  foodstuffBackendService = inject(FoodstuffBackendService);
  snackBarService = inject(SnackBarService);

  foodstuff: Foodstuff | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.foodstuffBackendService
      .getFoodstuffById(data.id)
      .pipe(take(1))
      .subscribe({
        next: (foodstuff) => {
          console.debug('foodstuff fetched: ', foodstuff);
          this.foodstuff = foodstuff;
        },
        error: (error) => {
          console.error('failed to fetch foodstuff: ', error);
          this.snackBarService.open('Zutat konnte nicht geladen werden');
        },
      });
  }

  deleteFoodstuff(): void {
    this.foodstuff?.id
      ? this.foodstuffBackendService
          .deleteFoodstuff(this.foodstuff.id)
          .pipe(take(1))
          .subscribe({
            next: (id) => {
              console.info('foodstuff deleted: ', id);
              this.snackBarService.open('Zutat gelöscht');
              this.foodstuffBackendService.notifyFoodstuffsChanged();
              this.dialogRef.close();
            },
            error: (error) => {
              console.error('failed to delete foodstuff: ', error);
              this.snackBarService.open('Zutat konnte nicht gelöscht werden');
            },
          })
      : null;
  }
}
