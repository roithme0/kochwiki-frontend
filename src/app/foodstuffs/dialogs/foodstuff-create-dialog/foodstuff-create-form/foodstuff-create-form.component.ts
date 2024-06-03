import { Component, inject, output } from '@angular/core';
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
  selector: 'app-foodstuff-create-form',
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
  templateUrl: './foodstuff-create-form.component.html',
  styleUrl: './foodstuff-create-form.component.css',
})
// fetch foodstuff meta data
// render form to create foodstuff
export class FoodstuffCreateFormComponent {
  success = output<void>();

  verboseNames: VerboseNames | null = null;
  unitChoices: UnitChoices | null = null;

  foodstuffService = inject(FoodstuffService);
  fb = inject(FormBuilder);

  foodstuffForm = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    unit: ['', Validators.required],
    kcal: [<number | null>null],
    carbs: [<number | null>null],
    protein: [<number | null>null],
    fat: [<number | null>null],
  });

  ngOnInit(): void {
    this.fetchVerboseNames();
    this.fetchUnitChoices();
  }

  // submit form to create foodstuff
  // close dialog on success
  onSubmit(): void {
    console.debug(
      'submitting create foodstuff form: ',
      this.foodstuffForm.value
    );
    const foodstuff: Partial<Foodstuff> = this.foodstuffForm.value as Foodstuff;

    this.foodstuffService.postFoodstuff(foodstuff).subscribe({
      next: (foodstuff) => {
        console.info('foodstuff created: ', foodstuff);
        this.foodstuffService.notifyFoodstuffsChanged();
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to create foodstuff: ', error);
      },
    });
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
