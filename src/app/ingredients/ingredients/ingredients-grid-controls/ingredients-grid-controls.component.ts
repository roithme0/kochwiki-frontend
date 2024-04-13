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

import { FoodstuffsGridControlsService } from '../services/foodstuff-grid-controls.service';
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
  selector: 'app-ingredients-grid-controls',
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
  templateUrl: './ingredients-grid-controls.component.html',
  styleUrl: './ingredients-grid-controls.component.css',
})
export class IngredientsGridControlsComponent {
  // track & emit grid control inputs
  // render grid controls
  @Input() ingredients: Signal<Foodstuff[]> = signal([]);

  searchControl: FormControl = new FormControl('');
  filterControl: FormControl = new FormControl('all');

  names: Signal<string[]> = computed(() => {
    // generate a list of names of all displayed ingredients
    return this.ingredients().map((ingredient) => ingredient.name);
  });
  brands: Signal<string[]> = computed(() => {
    // generate a list of brands of all displayed ingredients
    const brands: string[] = this.ingredients().map(
      (ingredient) => ingredient.brand || ''
    );
    return brands.filter((brand) => brand !== '');
  });
  filteredNames: Signal<Set<string>> = computed(() => {
    // filter names based on search input (case-insensitive)
    const searchValue = this.searchControl.value || '';
    const filtered = this.names().filter((name) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return new Set(filtered);
  });
  filteredBrands: Signal<Set<string>> = computed(() => {
    // filter brands based on search input (case-insensitive)
    const searchValue = this.searchControl.value || '';
    const filtered = this.brands().filter((brand) =>
      brand.toLowerCase().includes(searchValue.toLowerCase())
    );
    return new Set(filtered);
  });

  unitChoices: UnitChoices | null = null;

  ingredientsGridControlsService = inject(FoodstuffsGridControlsService);
  ingredientService = inject(FoodstuffService);

  constructor() {
    // emit search & filter values
    this.searchControl.valueChanges.subscribe(
      (value) => (this.ingredientsGridControlsService.searchBy = value)
    );
    this.filterControl.valueChanges.subscribe(
      (value) => (this.ingredientsGridControlsService.filterBy = value)
    );
  }

  ngOnInit(): void {
    this.fetchUnitChoices();
  }

  fetchUnitChoices(): void {
    this.ingredientService.fetchUnitChoices().subscribe({
      next: (unitChoices) => {
        console.debug('fetched ingredient unit choices: ', unitChoices);
        this.unitChoices = unitChoices;
      },
      error: (error) => {
        console.error('failed to fetch ingredient unit choices: ', error);
      },
    });
  }

  getKeys(obj: Object): string[] {
    // return keys of object
    // used in template as Object.keys() is not available
    return Object.keys(obj);
  }
}
