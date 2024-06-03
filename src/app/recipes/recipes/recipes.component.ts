import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderService } from '../../services/page-header.service';

import { RecipesGridControlsComponent } from './recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridComponent } from './recipes-grid/recipes-grid.component';
import { RecipesGridCreateRecipeComponent } from './recipes-grid-create-recipe/recipes-grid-create-recipe.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridControlsComponent,
    RecipesGridComponent,
    RecipesGridCreateRecipeComponent,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
// set header values
// render the recipes-grid component
export class RecipesComponent {
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    // set header values
    this.pageHeaderService.headline = 'Rezepte';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
