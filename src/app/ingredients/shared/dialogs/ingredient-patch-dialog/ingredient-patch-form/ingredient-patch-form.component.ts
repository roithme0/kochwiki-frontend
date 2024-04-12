import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Ingredient } from '../../../interfaces/ingredient';
import { VerboseNames } from '../../../interfaces/ingredient-meta-data';
import { UnitChoices } from '../../../interfaces/ingredient-meta-data';

import { IngredientService } from '../../../services/ingredient.service';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ingredient-patch-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './ingredient-patch-form.component.html',
  styleUrl: './ingredient-patch-form.component.css',
})
export class IngredientPatchFormComponent {
  // fetch ingredient meta data
  // fetch ingredient by id
  // render form to edit ingredient
  ingredientService: IngredientService = inject(IngredientService);
  fb: FormBuilder = inject(FormBuilder);

  @Input() id: number | undefined;
  @Output() success: EventEmitter<void> = new EventEmitter();

  verboseNames: VerboseNames | null = null;
  unitChoices: UnitChoices | null = null;

  ingredientForm = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    unit: ['', Validators.required],
    kcal: [<number | null>null],
    carbs: [<number | null>null],
    protein: [<number | null>null],
    fat: [<number | null>null],
  });

  ngOnInit(): void {
    // fetch ingredient meta data
    // fetch ingredient by id
    this.fetchVerboseNames();
    this.fetchUnitChoices();

    if (this.id === undefined) {
      console.error('no ingredient id provided');
      return;
    }

    this.fetchIngredientById(this.id);
  }

  onSubmit(formData: any): void {
    // submit form to patch ingredient
    // close dialog on success
    console.debug('submitting patch ingredient form: ', formData);
    const updates: Partial<Ingredient> = formData as Ingredient;

    if (this.id === undefined) {
      console.error('no ingredient id provided');
      return;
    }

    this.ingredientService.patchIngredient(this.id, updates).subscribe({
      next: (ingredient) => {
        console.debug('ingredient patched: ', ingredient);
        this.ingredientService.notifyIngredientsChanged();
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to patch ingredient: ', error);
      },
    });
  }

  fetchIngredientById(id: number): void {
    this.ingredientService.getIngredientById(id).subscribe({
      next: (ingredient) => {
        console.debug('ingredient fetched: ', ingredient);
        this.ingredientForm.patchValue(ingredient);
      },
      error: (error) => {
        console.error('failed to fetch ingredient: ', error);
      },
    });
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
