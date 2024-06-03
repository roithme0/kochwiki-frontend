import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffsTableControlComponent } from './foodstuffs-table-control/foodstuffs-table-control.component';
import { FoodstuffsTableComponent } from './foodstuffs-table/foodstuffs-table.component';
import { FoodstuffsTableCreateFoodstuffComponent } from './foodstuffs-table-create-foodstuff/foodstuffs-table-create-foodstuff.component';

import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-foodstuffs-page',
  standalone: true,
  imports: [
    CommonModule,
    FoodstuffsTableControlComponent,
    FoodstuffsTableComponent,
    FoodstuffsTableCreateFoodstuffComponent,
  ],
  templateUrl: './foodstuffs-page.component.html',
  styleUrl: './foodstuffs-page.component.css',
})
// set header values
// render foodtuffs-grid component
export class FoodstuffsPageComponent {
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    this.pageHeaderService.headline = 'Lebensmittel';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
