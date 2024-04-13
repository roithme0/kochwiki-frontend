import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Foodstuff } from '../../../interfaces/foodstuff';
import { VerboseNames } from '../../../interfaces/foodstuff-meta-data';
import { UnitChoices } from '../../../interfaces/foodstuff-meta-data';

import { FoodstuffService } from '../../../services/foodstuff.service';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ingredient-create-form',
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
  templateUrl: './ingredient-create-form.component.html',
  styleUrl: './ingredient-create-form.component.css',
})
export class IngredientCreateFormComponent {
  // fetch ingredient meta data
  // render form to create ingredient
  @Output() success: EventEmitter<void> = new EventEmitter();

  verboseNames: VerboseNames | null = null;
  unitChoices: UnitChoices | null = null;

  ingredientService = inject(FoodstuffService);
  fb = inject(FormBuilder);

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
    this.fetchVerboseNames();
    this.fetchUnitChoices();
  }

  // submit form to create foodstuff
  // close dialog on success
  onSubmit(): void {
    console.debug(
      'submitting create ingredient form: ',
      this.ingredientForm.value
    );
    const foodstuff: Partial<Foodstuff> = this.ingredientForm
      .value as Foodstuff;

    this.ingredientService.postFoodstuff(foodstuff).subscribe({
      next: (foodstuff) => {
        console.info('foodstuff created: ', foodstuff);
        this.ingredientService.notifyFoodstuffsChanged();
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to create foodstuff: ', error);
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
