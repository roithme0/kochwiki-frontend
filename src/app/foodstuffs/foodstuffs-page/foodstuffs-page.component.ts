import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffsTableControlComponent } from './foodstuffs-table-control/foodstuffs-table-control.component';
import { FoodstuffsTableComponent } from './foodstuffs-table/foodstuffs-table.component';
import { FoodstuffsTableCreateFoodstuffComponent } from './foodstuffs-table-create-foodstuff/foodstuffs-table-create-foodstuff.component';

import { PageHeaderService } from '../../services/page-header.service';
import { FoodstuffsService } from './services/foodstuffs.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-foodstuffs-page',
  standalone: true,
  imports: [
    CommonModule,
    FoodstuffsTableControlComponent,
    FoodstuffsTableComponent,
    FoodstuffsTableCreateFoodstuffComponent,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './foodstuffs-page.component.html',
  styleUrl: './foodstuffs-page.component.css',
})
export class FoodstuffsPageComponent {
  pageHeaderService = inject(PageHeaderService);
  foodstuffsService = inject(FoodstuffsService);

  isLoading: Signal<boolean> = this.foodstuffsService.isLoading;
  hasError: Signal<boolean> = this.foodstuffsService.hasError;

  ngOnInit() {
    this.pageHeaderService.headline = 'Lebensmittel';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
