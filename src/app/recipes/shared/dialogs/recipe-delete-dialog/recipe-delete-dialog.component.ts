import { Component, Inject, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RecipeService } from '../../../shared/services/recipe.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './recipe-delete-dialog.component.html',
  styleUrl: './recipe-delete-dialog.component.css',
})
export class RecipeDeleteDialogComponent {
  // get recipe id from mat dialog data
  // render buttons to delete a recipe
  dialogRef: MatDialogRef<RecipeDeleteDialogComponent> = inject(MatDialogRef);
  recipeService: RecipeService = inject(RecipeService);
  router: Router = inject(Router);

  @Output() success: EventEmitter<void> = new EventEmitter();

  id: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.id = data.id;
  }

  deleteRecipe(): void {
    // delete recipe
    // close dialog on success
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
