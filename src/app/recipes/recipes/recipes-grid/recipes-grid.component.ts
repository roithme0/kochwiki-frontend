import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RecipesGridControlsComponent } from '../recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridElementComponent } from '../recipes-grid-element/recipes-grid-element.component';

import { RecipeCreateDialogComponent } from '../../shared/dialogs/recipe-create-dialog/recipe-create-dialog.component';

import { Recipe } from '../../shared/interfaces/recipe';

import { RecipesGridDisplayedRecipesService } from '../shared/recipes-grid-displayed-recipes.service';
import { WindowWidthService } from '../../../shared/services/window-width.service';

@Component({
  selector: 'app-recipes-grid',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridControlsComponent,
    RecipesGridElementComponent,
    RecipeCreateDialogComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './recipes-grid.component.html',
  styleUrl: './recipes-grid.component.css',
})
export class RecipesGridComponent {
  // render grid-controls component
  // render recipes in grid
  recipesGridDisplayedRecipesService: RecipesGridDisplayedRecipesService =
    inject(RecipesGridDisplayedRecipesService);
  windowWidthService: WindowWidthService = inject(WindowWidthService);
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  displayedRecipes: Signal<Recipe[]> =
    this.recipesGridDisplayedRecipesService.displayedRecipes;
  loadingDisplayedRecipes: Signal<boolean> = this.recipesGridDisplayedRecipesService.loading;
  errorLoadingDisplayedRecipes: Signal<boolean> = this.recipesGridDisplayedRecipesService.error;
  windowInnerWidth: Signal<number> =
    this.windowWidthService.getWindowInnerWidth();

  displayedColumns: Signal<number> = computed(() => {
    const windowInnerWidth: number = this.windowInnerWidth();
    if (windowInnerWidth < 600) {
      return 2;
    } else if (windowInnerWidth < 900) {
      return 3;
    } else {
      return 4;
    }
  });

  openCreateRecipeDialog(): void {
    // open dialog to create new recipe
    this.dialog.open(RecipeCreateDialogComponent);
  }
}
