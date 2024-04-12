import { Component, Input, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientService } from '../../shared/services/ingredient.service';
import { VerboseNames } from '../../shared/interfaces/ingredient-meta-data';

@Component({
  selector: 'app-ingredients-grid-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-grid-header.component.html',
  styleUrl: './ingredients-grid-header.component.css',
})
export class IngredientsGridHeaderComponent {
  // fetch ingredient verbose names
  // render ingredient verbose names
  @Input() displayedFields: Signal<string[]> | undefined;

  verboseNames: VerboseNames | null = null;

  ingredientService: IngredientService = inject(IngredientService);

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
