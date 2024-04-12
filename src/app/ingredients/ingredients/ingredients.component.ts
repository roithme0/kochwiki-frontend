import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsGridComponent } from './ingredients-grid/ingredients-grid.component';

import { PageHeaderService } from '../../shared/services/page-header.service';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, IngredientsGridComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  // set header values
  // render ingredients-grid component
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    // set header values
    this.pageHeaderService.headline = 'Zutaten';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
