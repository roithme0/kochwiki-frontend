import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Recipe } from '../interfaces/recipe';

import { RecipeBackendService } from '../services/recipe-backend.service';
import { PageHeaderService } from '../../services/page-header.service';
import { SnackBarService } from '../../services/snack-bar.service';

import { IngredientsGridComponent } from './ingredients-grid/ingredients-grid.component';
import { StepsGridComponent } from './steps-grid/steps-grid.component';
import { RecipeMacroChartComponent } from './recipe-macro-chart/recipe-macro-chart.component';
import { RecipePatchDialogComponent } from '../dialogs/recipe-patch-dialog/recipe-patch-dialog.component';
import { RecipeDeleteDialogComponent } from '../dialogs/recipe-delete-dialog/recipe-delete-dialog.component';
import { Unsubscribe } from '../../utils/unsubsribe';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridComponent,
    StepsGridComponent,
    RecipeMacroChartComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css',
})
// set header values
// fetch recipe
// render recipe details
export class RecipePageComponent extends Unsubscribe {
  route = inject(ActivatedRoute);
  pageHeaderService = inject(PageHeaderService);
  recipeBackendService = inject(RecipeBackendService);
  snackBarService = inject(SnackBarService);
  dialog = inject(MatDialog);

  id: number | undefined;
  recipe: Recipe | null = null;

  // fetch recipe id from route
  // track recipe changes
  constructor() {
    super();

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.debug('id: ', this.id);

    this.recipeBackendService.recipes$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchRecipe(this.id);
      });
  }

  // set headline
  // fetch recipe
  ngOnInit() {
    this.pageHeaderService.back = 'recipes';
    this.pageHeaderService.showBack = true;

    this.fetchRecipe(this.id);
  }

  // fetch recipe by id if id is provided
  // set headline
  fetchRecipe(id: number | undefined): void {
    if (id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.recipeBackendService
      .getRecipeById(id)
      .pipe(take(1))
      .subscribe({
        next: (recipe: Recipe) => {
          console.debug('fetched recipe: ', recipe);
          this.recipe = recipe;
          this.pageHeaderService.headline = this.recipe.name;
        },
        error: (error: any) => {
          console.error('failed to fetch recipe: ', error);
          this.snackBarService.open('Rezept konnte nicht geladen werden');
          this.pageHeaderService.headline = 'Fehler';
        },
      });
  }

  openPatchRecipeDialog(): void {
    this.dialog.open(RecipePatchDialogComponent, {
      data: { id: this.recipe?.id },
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
      disableClose: true,
    });
  }

  openDeleteRecipeDialog(): void {
    this.dialog.open(RecipeDeleteDialogComponent, {
      data: { id: this.recipe?.id },
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
    });
  }
}
