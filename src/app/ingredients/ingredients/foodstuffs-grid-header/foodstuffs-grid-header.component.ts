import { Component, Input, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffService } from '../../shared/services/foodstuff.service';
import { VerboseNames } from '../../shared/interfaces/foodstuff-meta-data';

@Component({
  selector: 'app-foodstuffs-grid-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foodstuffs-grid-header.component.html',
  styleUrl: './foodstuffs-grid-header.component.css',
})
// fetch foodstuff verbose names
// render foodstuff verbose names
export class FoodstuffsGridHeaderComponent {
  @Input() displayedFields: Signal<string[]> | undefined;

  verboseNames: VerboseNames | null = null;

  foodstuffService = inject(FoodstuffService);

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
