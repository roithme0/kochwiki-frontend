import { Component, Inject, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';

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
// get recipe id from mat dialog data
// render buttons to delete a recipe
export class RecipeDeleteDialogComponent {
  dialogRef: MatDialogRef<RecipeDeleteDialogComponent> = inject(MatDialogRef);
  recipeService: RecipeService = inject(RecipeService);
  router: Router = inject(Router);

  success = output<void>();

  id: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.id = data.id;
  }

  // delete recipe
  // close dialog on success
  deleteRecipe(): void {
    if (this.id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.recipeService.deleteRecipe(this.id).subscribe({
      next: (id) => {
        console.info('recipe deleted: ', id);
        this.success.emit();
        this.dialogRef.close();
        this.router.navigate(['recipes']);
      },
      error: (error) => {
        console.error('failed to delete recipe: ', error);
      },
    });
  }
}
