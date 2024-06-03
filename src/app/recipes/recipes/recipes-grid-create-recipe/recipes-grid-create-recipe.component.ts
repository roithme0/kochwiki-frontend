import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { RecipeCreateDialogComponent } from '../../dialogs/recipe-create-dialog/recipe-create-dialog.component';

@Component({
  selector: 'app-recipes-grid-create-recipe',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './recipes-grid-create-recipe.component.html',
  styleUrl: './recipes-grid-create-recipe.component.css',
})
export class RecipesGridCreateRecipeComponent {
  dialog = inject(MatDialog);

  // open dialog to create new recipe
  openCreateRecipeDialog(): void {
    this.dialog.open(RecipeCreateDialogComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
      disableClose: true,
    });
  }
}
