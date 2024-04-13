import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffsGridComponent } from './foodstuffs-grid/foodstuffs-grid.component';

import { PageHeaderService } from '../../shared/services/page-header.service';

@Component({
  selector: 'app-foodstuffs',
  standalone: true,
  imports: [CommonModule, FoodstuffsGridComponent],
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
