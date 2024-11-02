import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Recipe } from '../../interfaces/recipe';
import { RecipesGridControlsService } from '../services/recipes-grid-controls.service';

@Component({
  selector: 'app-recipes-search',
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
  templateUrl: './recipes-search.component.html',
  styleUrl: './recipes-search.component.scss',
})
export class RecipesSearchComponent {
  recipesGridControlsService = inject(RecipesGridControlsService);

  showSearchChange = output<boolean>();

  recipes: Signal<Recipe[]> = this.recipesGridControlsService.recipes;
  searchValue: WritableSignal<string> = signal('');
  showSearch: WritableSignal<boolean> = signal(false);

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

  onSeachValueChanged(newSearchValue: string): void {
    this.searchValue.set(newSearchValue);
    this.recipesGridControlsService.searchBy = this.searchValue();
  }

  onSearchButtonClicked(): void {
    this.showSearch.set(!this.showSearch());
    this.showSearchChange.emit(this.showSearch());
  }
}
