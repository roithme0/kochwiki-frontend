import {
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Recipe } from '../../interfaces/recipe';

import { RecipesGridControlsService } from '../services/recipes-grid-controls.service';

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
  styleUrl: './recipes-grid-controls.component.scss',
})
// generate a list of names and origins of all displayed recipes
// render recipe grid controls
export class RecipesGridControlsComponent {
  recipesGridControlsService = inject(RecipesGridControlsService);

  recipes: Signal<Recipe[]> = this.recipesGridControlsService.recipes;

  searchValue: WritableSignal<string> = signal('');

  // generate a list of names of all displayed recipes
  names: Signal<string[]> = computed(() => {
    return this.recipes().map((recipe) => recipe.name);
  });
  // generate a list of origins of all displayed recipes
  origins: Signal<string[]> = computed(() => {
    const origins: string[] = this.recipes().map(
      (recipe) => recipe.originName || ''
    );
    return origins.filter((origin) => origin != '');
  });
  // filter names based on search input (case-insensitive)
  filteredNames: Signal<Set<string>> = computed(() => {
    return new Set(
      this.names().filter((name) =>
        name.toLowerCase().includes(this.searchValue().toLowerCase())
      )
    );
  });
  // filter origins based on search input (case-insensitive)
  filteredOrigins: Signal<Set<string>> = computed(() => {
    return new Set(
      this.origins().filter((origin) =>
        origin.toLowerCase().includes(this.searchValue().toLowerCase())
      )
    );
  });

  // constructor() {
  //   // should work but does not
  //   effect(() => {
  //     this.recipesGridControlsService.searchBy = this.searchValue();
  //     console.log('searchValue effect fired');
  //   });
  // }

  // workaround for effect not working
  OnSeachValueChanged(newSearchValue: string): void {
    this.searchValue.set(newSearchValue);
    this.recipesGridControlsService.searchBy = this.searchValue();
  }
}
