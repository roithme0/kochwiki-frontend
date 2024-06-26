import {
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FoodstuffTableControlService } from '../services/foodstuff-table-control.service';
import { FoodstuffsService } from '../services/foodstuffs.service';

import { Foodstuff } from '../../interfaces/foodstuff';
import { FoodstuffUnitChoices } from '../../interfaces/foodstuff-meta-data';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-foodstuffs-table-control',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './foodstuffs-table-control.component.html',
  styleUrl: './foodstuffs-table-control.component.css',
})
export class FoodstuffsTableControlComponent {
  //#region services

  foodstuffTableControlsService = inject(FoodstuffTableControlService);
  foodstuffsService = inject(FoodstuffsService);

  //#endregion

  //#region fields

  searchValue: WritableSignal<string> = signal('');
  filterValue: WritableSignal<string> = signal('all');

  foodstuffs: Signal<Foodstuff[]> =
    this.foodstuffTableControlsService.foodstuffs;
  unitChoices: Signal<FoodstuffUnitChoices | null> =
    this.foodstuffsService.unitChoices;

  displayedUnitChoices: Signal<FoodstuffUnitChoices> = computed(() => {
    const unitChoices = this.unitChoices();
    if (unitChoices == null) {
      return {
        G: 'g',
        ML: 'ml',
        PIECE: 'Stück',
      };
    }
    return unitChoices;
  });

  // generate a list of names of all displayed foodstuffs
  names: Signal<string[]> = computed(() => {
    return this.foodstuffs().map((foodstuff) => foodstuff.name);
  });
  // generate a list of brands of all displayed foodstuffs
  brands: Signal<string[]> = computed(() => {
    const brands: string[] = this.foodstuffs().map(
      (foodstuff) => foodstuff.brand || ''
    );
    return brands.filter((brand) => brand !== '');
  });
  // filter names based on search input (case-insensitive)
  filteredNames: Signal<Set<string>> = computed(() => {
    const filtered = this.names().filter((name) =>
      name.toLowerCase().includes(this.searchValue().toLowerCase())
    );
    return new Set(filtered);
  });
  // filter brands based on search input (case-insensitive)
  filteredBrands: Signal<Set<string>> = computed(() => {
    const filtered = this.brands().filter((brand) =>
      brand.toLowerCase().includes(this.searchValue().toLowerCase())
    );
    return new Set(filtered);
  });

  //#endregion

  constructor() {
    effect(
      () => {
        console.log('searchValue: ', this.searchValue());
        this.foodstuffTableControlsService.searchBy = this.searchValue();
      },
      { allowSignalWrites: true }
    );
    effect(
      () => {
        this.foodstuffTableControlsService.filterBy = this.filterValue();
      },
      { allowSignalWrites: true }
    );
  }

  // return keys of object
  // used in template as Object.keys() is not available
  getKeys(obj: Object): string[] {
    return Object.keys(obj);
  }
}
