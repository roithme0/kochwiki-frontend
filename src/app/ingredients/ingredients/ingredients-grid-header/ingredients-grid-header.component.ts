import { Component, Input, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffService } from '../../shared/services/foodstuff.service';
import { VerboseNames } from '../../shared/interfaces/foodstuff-meta-data';

@Component({
  selector: 'app-ingredients-grid-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-grid-header.component.html',
  styleUrl: './ingredients-grid-header.component.css',
})
// fetch foodstuff verbose names
// render foodstuff verbose names
export class IngredientsGridHeaderComponent {
  @Input() displayedFields: Signal<string[]> | undefined;

  verboseNames: VerboseNames | null = null;

  ingredientService = inject(FoodstuffService);

  ngOnInit(): void {
    this.fetchVerboseNames();
  }

  fetchVerboseNames(): void {
    this.ingredientService.fetchVerboseNames().subscribe({
      next: (verboseNames) => {
        console.debug('fetched ingredient verbose names: ', verboseNames);
        this.verboseNames = verboseNames;
      },
      error: (error) => {
        console.error('failed to fetch ingredient verbose names: ', error);
      },
    });
  }
}
