import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderService } from '../../shared/services/page-header.service';

import { RecipesGridComponent } from './recipes-grid/recipes-grid.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RecipesGridComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  // set header values
  // render the recipes-grid component
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    // set header values
    this.pageHeaderService.headline = 'Rezepte';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
