import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  input,
  output,
} from '@angular/core';
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
  selector: 'app-foodstuff-patch-form',
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
  templateUrl: './foodstuff-patch-form.component.html',
  styleUrl: './foodstuff-patch-form.component.css',
})
// fetch foodstuff meta data
// fetch foodstuff by id
// render form to edit foodstuff
export class FoodstuffPatchFormComponent {
  foodstuffService = inject(FoodstuffService);
  fb = inject(FormBuilder);

  id = input.required<number>();
  @Output() success: EventEmitter<void> = new EventEmitter();

  verboseNames: VerboseNames | null = null;
  unitChoices: UnitChoices | null = null;

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
    this.fetchFoodstuffById(this.id());
  }

  // submit form to patch foodstuff
  // close dialog on success
  onSubmit(formData: any): void {
    console.debug('submitting patch foodstuff form: ', formData);
    const updates: Partial<Foodstuff> = formData as Foodstuff;

    this.foodstuffService.patchFoodstuff(this.id(), updates).subscribe({
      next: (foodstuff) => {
        console.debug('foodstuff patched: ', foodstuff);
        this.foodstuffService.notifyFoodstuffsChanged();
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to patch foodstuff: ', error);
      },
    });
  }

  fetchFoodstuffById(id: number): void {
    this.foodstuffService.getFoodstuffById(id).subscribe({
      next: (foodstuff) => {
        console.debug('foodstuff fetched: ', foodstuff);
        this.foodstuffForm.patchValue(foodstuff);
      },
      error: (error) => {
        console.error('failed to fetch foodstuff: ', error);
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
