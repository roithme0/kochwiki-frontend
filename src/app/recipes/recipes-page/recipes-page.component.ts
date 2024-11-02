import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderService } from '../../services/page-header.service';
import { RecipesGridComponent } from './recipes-grid/recipes-grid.component';
import { RecipesGridCreateRecipeComponent } from './recipes-grid-create-recipe/recipes-grid-create-recipe.component';
import { RecipesSearchComponent } from './recipes-search/recipes-search.component';
import { MatDialog } from '@angular/material/dialog';
import { RecipeCreateDialogComponent } from '../dialogs/recipe-create-dialog/recipe-create-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridComponent,
    RecipesGridCreateRecipeComponent,
    RecipesSearchComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent {
  dialog = inject(MatDialog);
  pageHeaderService = inject(PageHeaderService);

  showSearch: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.pageHeaderService.headline = 'Rezepte';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }

  openCreateRecipeDialog(): void {
    this.dialog.open(RecipeCreateDialogComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
      disableClose: true,
    });
  }
}
