import { Component, Inject, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RecipeBackendService } from '../../services/recipe-backend.service';
import { SnackBarService } from '../../../services/snack-bar.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DialogHeaderComponent,
  ],
  templateUrl: './recipe-delete-dialog.component.html',
  styleUrl: './recipe-delete-dialog.component.css',
})
export class RecipeDeleteDialogComponent {
  dialogRef = inject(MatDialogRef);
  recipeBackendService = inject(RecipeBackendService);
  router = inject(Router);
  snackBarService = inject(SnackBarService);

  success = output<void>();

  id: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.id = data.id;
  }

  deleteRecipe(): void {
    if (this.id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.recipeBackendService
      .deleteRecipe(this.id)
      .pipe(take(1))
      .subscribe({
        next: (id) => {
          console.info('recipe deleted: ', id);
          this.snackBarService.open('Rezept gelöscht');
          this.success.emit();
          this.dialogRef.close();
          this.router.navigate(['recipes']);
        },
        error: (error) => {
          console.error('failed to delete recipe: ', error);
          this.snackBarService.open('Rezept konnte nicht gelöscht werden');
        },
      });
  }
}
