import {
  Component,
  Input,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Recipe } from '../../shared/interfaces/recipe';

import { RecipesGridControlsService } from '../shared/recipes-grid-controls.service';

@Component({
  selector: 'app-recipes-grid-controls',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './recipes-grid-controls.component.html',
  styleUrl: './recipes-grid-controls.component.css',
})
// generate a list of names and origins of all displayed recipes
// render recipe grid controls
export class RecipesGridControlsComponent {
  recipesGridControlsService = inject(RecipesGridControlsService);

  recipes: Signal<Recipe[]> = this.recipesGridControlsService.recipes;

  searchControl: FormControl = new FormControl('');

  names: Signal<string[]> = computed(() => {
    // generate a list of names of all displayed recipes
    return this.recipes().map((recipe) => recipe.name);
  });
  origins: Signal<string[]> = computed(() => {
    // generate a list of origins of all displayed recipes
    const origins: string[] = this.recipes().map(
      (recipe) => recipe.originName || ''
    );
    return origins.filter((origin) => origin != '');
  });
  filteredNames: Signal<Set<string>> = computed(() => {
    // filter names based on search input (case-insensitive)
    const searchValue = this.searchControl.value || '';
    return new Set(
      this.names().filter((name) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  });
  filteredOrigins: Signal<Set<string>> = computed(() => {
    // filter origins based on search input (case-insensitive)
    const searchValue = this.searchControl.value || '';
    return new Set(
      this.origins().filter((origin) =>
        origin.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  });

  constructor() {
    // emit search value
    this.searchControl.valueChanges.subscribe(
      (value) => (this.recipesGridControlsService.searchBy = value)
    );
  }

  emitControlValue(): void {
    console.info('search: ', this.searchControl.value);
    this.recipesGridControlsService.searchBy = this.searchControl.value;
  }
}
