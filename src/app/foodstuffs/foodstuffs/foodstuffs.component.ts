import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffsTableControlComponent } from './foodstuffs-table-control/foodstuffs-table-control.component';
import { FoodstuffsTableComponent } from './foodstuffs-table/foodstuffs-table.component';

import { PageHeaderService } from '../../shared/services/page-header.service';

@Component({
  selector: 'app-foodstuffs',
  standalone: true,
  imports: [
    CommonModule,
    FoodstuffsTableControlComponent,
    FoodstuffsTableComponent,
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
