import {
  Component,
  Input,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FoodstuffTableControlServiceService } from '../services/foodstuff-table-control-service.service';
import { FoodstuffService } from '../../shared/services/foodstuff.service';

import { UnitChoices } from '../../shared/interfaces/foodstuff-meta-data';
import { Foodstuff } from '../../shared/interfaces/foodstuff';

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
  searchControl: FormControl = new FormControl('');
  filterControl: FormControl = new FormControl('all');

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
    const searchValue = this.searchControl.value || '';
    const filtered = this.names().filter((name) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return new Set(filtered);
  });
  // filter brands based on search input (case-insensitive)
  filteredBrands: Signal<Set<string>> = computed(() => {
    const searchValue = this.searchControl.value || '';
    const filtered = this.brands().filter((brand) =>
      brand.toLowerCase().includes(searchValue.toLowerCase())
    );
    return new Set(filtered);
  });

  foodstuffsTableControlsService = inject(FoodstuffTableControlServiceService);
  foodstuffService = inject(FoodstuffService);

  foodstuffs: Signal<Foodstuff[]> =
    this.foodstuffsTableControlsService.foodstuffs;
  unitChoices: UnitChoices | null = null;

  constructor() {
    this.searchControl.valueChanges.subscribe(
      (value) => (this.foodstuffsTableControlsService.searchBy = value)
    );
    this.filterControl.valueChanges.subscribe(
      (value) => (this.foodstuffsTableControlsService.filterBy = value)
    );
  }

  ngOnInit(): void {
    this.fetchUnitChoices();
  }

  fetchUnitChoices(): void {
    this.foodstuffService.fetchUnitChoices().subscribe({
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
