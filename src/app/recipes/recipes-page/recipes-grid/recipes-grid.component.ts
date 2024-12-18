import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipesGridElementComponent } from '../recipes-grid-element/recipes-grid-element.component';
import { RecipeCreateDialogComponent } from '../../dialogs/recipe-create-dialog/recipe-create-dialog.component';
import { Recipe } from '../../interfaces/recipe';
import { RecipesGridDisplayedRecipesService } from '../services/recipes-grid-displayed-recipes.service';
import { WindowWidthService } from '../../../services/window-width.service';

@Component({
  selector: 'app-recipes-grid',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridElementComponent,
    RecipeCreateDialogComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './recipes-grid.component.html',
  styleUrl: './recipes-grid.component.scss',
})
export class RecipesGridComponent {
  recipesGridDisplayedRecipesService: RecipesGridDisplayedRecipesService =
    inject(RecipesGridDisplayedRecipesService);
  windowWidthService: WindowWidthService = inject(WindowWidthService);
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  displayedRecipes: Signal<Recipe[]> =
    this.recipesGridDisplayedRecipesService.displayedRecipes;
  loadingDisplayedRecipes: Signal<boolean> =
    this.recipesGridDisplayedRecipesService.loading;
  errorLoadingDisplayedRecipes: Signal<boolean> =
    this.recipesGridDisplayedRecipesService.error;
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
}
