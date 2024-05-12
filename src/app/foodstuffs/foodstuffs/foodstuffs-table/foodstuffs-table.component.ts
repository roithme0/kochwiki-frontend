import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { Foodstuff } from '../../shared/interfaces/foodstuff';

import { FoodstuffsGridDisplayedFoodstuffsService } from '../services/foodstuff-grid-displayed-foodstuffs.service';
import { FoodstuffsGridDisplayedFieldsService } from '../services/foodstuff-grid-displayed-fields.service';
import { FoodstuffService } from '../../shared/services/foodstuff.service';
import { VerboseNames } from '../../shared/interfaces/foodstuff-meta-data';

@Component({
  selector: 'app-foodstuffs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './foodstuffs-table.component.html',
  styleUrl: './foodstuffs-table.component.css',
})
export class FoodstuffsTableComponent {
  displayedFoodstuffsService = inject(FoodstuffsGridDisplayedFoodstuffsService);
  displayedFieldsService = inject(FoodstuffsGridDisplayedFieldsService);
  foodstuffService = inject(FoodstuffService);

  verboseNames: VerboseNames | null = null;

  displayedFoodstuffs: Signal<Foodstuff[]> =
    this.displayedFoodstuffsService.displayedFoodstuffs;
  loadingDisplayedFoodstuffs: Signal<boolean> =
    this.displayedFoodstuffsService.loading;
  errorLoadingDisplayedFoodstuffs: Signal<boolean> =
    this.displayedFoodstuffsService.error;
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;

  ngOnInit(): void {
    this.fetchVerboseNames();
  }

  fetchVerboseNames(): void {
    this.foodstuffService.fetchVerboseNames().subscribe({
      next: (verboseNames) => {
        console.debug('fetched foodstuff verbose names: ', verboseNames);
        this.verboseNames = verboseNames;
      },
      error: (error) => {
        console.error('failed to fetch foodstuff verbose names: ', error);
      },
    });
  }
}
