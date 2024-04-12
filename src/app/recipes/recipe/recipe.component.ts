import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Recipe } from '../shared/interfaces/recipe';

import { RecipeService } from '../shared/services/recipe.service';
import { PageHeaderService } from '../../shared/services/page-header.service';

import { AmountsGridComponent } from './amounts-grid/amounts-grid.component';
import { StepsGridComponent } from './steps-grid/steps-grid.component';

import { RecipePatchDialogComponent } from '../shared/dialogs/recipe-patch-dialog/recipe-patch-dialog.component';
import { RecipeDeleteDialogComponent } from '../shared/dialogs/recipe-delete-dialog/recipe-delete-dialog.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CommonModule,
    AmountsGridComponent,
    StepsGridComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  // set header values
  // fetch recipe
  // render recipe details
  route: ActivatedRoute = inject(ActivatedRoute);
  pageHeaderService: PageHeaderService = inject(PageHeaderService);
  recipeService: RecipeService = inject(RecipeService);
  dialog: MatDialog = inject(MatDialog);

  id: number | undefined;
  recipe: Recipe | null = null;

  constructor() {
    // fetch recipe id from route
    // track recipe changes
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.debug('id: ', this.id);

    this.recipeService.recipes$.subscribe(() => {
      if (this.id === undefined) {
        console.error('no recipe id provided');
        return;
      }
      this.fetchRecipe(this.id);
    });
  }

  ngOnInit() {
    // set headline
    // fetch recipe
    this.pageHeaderService.back = 'recipes';
    this.pageHeaderService.showBack = true;

    if (this.id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.fetchRecipe(this.id);
  }

  fetchRecipe(id: number): void {
    // fetch recipe by id
    // set headline
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
    });
  }

  openDeleteRecipeDialog(): void {
    this.dialog.open(RecipeDeleteDialogComponent, {
      data: { id: this.recipe?.id },
    });
  }
}
