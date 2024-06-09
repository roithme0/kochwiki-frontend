import {
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FoodstuffTableControlService } from '../services/foodstuff-table-control.service';
import { FoodstuffBackendService } from '../../services/foodstuff-backend.service';

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
// track & emit grid control inputs
// render grid controls
export class FoodstuffsTableControlComponent {
  searchValue: WritableSignal<string> = signal('');
  filterValue: WritableSignal<string> = signal('all');

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

  foodstuffsTableControlsService = inject(FoodstuffTableControlService);
  foodstuffBackendService = inject(FoodstuffBackendService);

  foodstuffs: Signal<Foodstuff[]> =
    this.foodstuffsTableControlsService.foodstuffs;
  unitChoices: FoodstuffUnitChoices | null = null;

  // constructor() {
  //   // should work but does not
  //   effect(() => {
  //     this.foodstuffsTableControlsService.searchBy = this.searchValue();
  //     console.log('searchValue effect fired');
  //   });
  //   // should work but does not
  //   effect(() => {
  //     this.foodstuffsTableControlsService.filterBy = this.filterValue();
  //     console.log('filterValue effect fired');
  //   });
  // }

  ngOnInit(): void {
    this.fetchFoodstuffUnitChoices();
  }

  // workaround for effect not working
  OnSeachValueChanged(newSearchValue: string): void {
    this.searchValue.set(newSearchValue);
    this.foodstuffsTableControlsService.searchBy = this.searchValue();
  }

  // workaround for effect not working
  OnFilterValueChanged(newFilterValue: string): void {
    this.filterValue.set(newFilterValue);
    this.foodstuffsTableControlsService.filterBy = this.filterValue();
  }

  fetchFoodstuffUnitChoices(): void {
    this.foodstuffBackendService.fetchFoodstuffUnitChoices().subscribe({
      next: (unitChoices) => {
        console.debug('fetched foodstuff unit choices: ', unitChoices);
        this.unitChoices = unitChoices;
      },
      error: (error) => {
        console.error('failed to fetch foodstuff unit choices: ', error);
      },
    });
  }

  // return keys of object
  // used in template as Object.keys() is not available
  getKeys(obj: Object): string[] {
    return Object.keys(obj);
  }
}
