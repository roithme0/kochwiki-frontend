import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Foodstuff } from '../../../interfaces/foodstuff';
import { FoodstuffVerboseNames } from '../../../interfaces/foodstuff-meta-data';
import { FoodstuffUnitChoices } from '../../../interfaces/foodstuff-meta-data';

import { FoodstuffBackendService } from '../../../services/foodstuff-backend.service';
import { SnackBarService } from '../../../../services/snack-bar.service';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Observable, forkJoin } from 'rxjs';

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
export class FoodstuffPatchFormComponent {
  foodstuffBackendService = inject(FoodstuffBackendService);
  snackBarService = inject(SnackBarService);
  fb = inject(FormBuilder);

  id = input.required<number>();
  success = output<void>();

  verboseNames: FoodstuffVerboseNames | null = null;
  unitChoices: FoodstuffUnitChoices | null = null;

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
    this.fetchMetaData();
    this.fetchFoodstuffById(this.id());
  }

  // submit form to patch foodstuff
  // close dialog on success
  onSubmit(formData: any): void {
    console.debug('submitting patch foodstuff form: ', formData);
    const updates: Partial<Foodstuff> = formData as Foodstuff;

    this.foodstuffBackendService.patchFoodstuff(this.id(), updates).subscribe({
      next: (foodstuff) => {
        console.debug('foodstuff patched: ', foodstuff);
        this.snackBarService.open('Zutat aktualisiert');
        this.foodstuffBackendService.notifyFoodstuffsChanged();
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to patch foodstuff: ', error);
        this.snackBarService.open('Zutat konnte nicht aktualisiert werden');
      },
    });
  }

  fetchFoodstuffById(id: number): void {
    this.foodstuffBackendService.getFoodstuffById(id).subscribe({
      next: (foodstuff) => {
        console.debug('foodstuff fetched: ', foodstuff);
        this.foodstuffForm.patchValue(foodstuff);
      },
      error: (error) => {
        console.error('failed to fetch foodstuff: ', error);
        this.snackBarService.open('Zutat konnte nicht geladen werden');
      },
    });
  }

  fetchMetaData(): void {
    const requests: Observable<any> = forkJoin({
      verboseNames: this.foodstuffBackendService.fetchFoodstuffVerboseNames(),
      unitChoices: this.foodstuffBackendService.fetchFoodstuffUnitChoices(),
    });

    requests.subscribe({
      next: ({ verboseNames, unitChoices }) => {
        console.debug('fetched foodstuff verbose names: ', verboseNames);
        console.debug('fetched foodstuff unit choices: ', unitChoices);
        this.verboseNames = verboseNames;
        this.unitChoices = unitChoices;
      },
      error: (error) => {
        console.error('failed to fetch foodstuff meta data: ', error);
        this.snackBarService.open(
          'Metadaten für Lebensmittel konnten nicht geladen werden'
        );
      },
    });
  }

  // return keys of object
  // used in template as Object.keys() is not available
  getKeys(obj: Object): string[] {
    return Object.keys(obj);
  }
}
