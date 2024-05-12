import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Recipe } from '../shared/interfaces/recipe';

import { RecipeService } from '../shared/services/recipe.service';
import { PageHeaderService } from '../../shared/services/page-header.service';

import { IngredientsGridComponent } from './ingredients-grid/ingredients-grid.component';
import { StepsGridComponent } from './steps-grid/steps-grid.component';

import { RecipePatchDialogComponent } from '../shared/dialogs/recipe-patch-dialog/recipe-patch-dialog.component';
import { RecipeDeleteDialogComponent } from '../shared/dialogs/recipe-delete-dialog/recipe-delete-dialog.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridComponent,
    StepsGridComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
// set header values
// fetch recipe
// render recipe details
export class RecipeComponent {
  route = inject(ActivatedRoute);
  pageHeaderService = inject(PageHeaderService);
  recipeService = inject(RecipeService);
  dialog = inject(MatDialog);

  id: number | undefined;
  recipe: Recipe | null = null;

  // fetch recipe id from route
  // track recipe changes
  constructor() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.debug('id: ', this.id);

    this.recipeService.recipes$.subscribe(() => {
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

    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: Recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipe = recipe;
        this.pageHeaderService.headline = this.recipe.name;
      },
      error: (error: any) => {
        console.error('failed to fetch recipe: ', error);
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
