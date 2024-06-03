import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffsTableControlComponent } from './foodstuffs-table-control/foodstuffs-table-control.component';
import { FoodstuffsTableComponent } from './foodstuffs-table/foodstuffs-table.component';
import { FoodstuffsTableCreateFoodstuffComponent } from './foodstuffs-table-create-foodstuff/foodstuffs-table-create-foodstuff.component';

import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-foodstuffs',
  standalone: true,
  imports: [
    CommonModule,
    FoodstuffsTableControlComponent,
    FoodstuffsTableComponent,
    FoodstuffsTableCreateFoodstuffComponent,
  ],
  templateUrl: './foodstuffs.component.html',
  styleUrl: './foodstuffs.component.css',
})
// set header values
// render foodtuffs-grid component
export class FoodstuffsComponent {
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    this.pageHeaderService.headline = 'Lebensmittel';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
