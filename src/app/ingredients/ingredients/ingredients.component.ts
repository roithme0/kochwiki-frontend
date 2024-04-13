import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffsGridComponent } from './foodstuffs-grid/foodstuffs-grid.component';

import { PageHeaderService } from '../../shared/services/page-header.service';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, FoodstuffsGridComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
// set header values
// render foodtuffs-grid component
export class IngredientsComponent {
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    this.pageHeaderService.headline = 'Zutaten';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
