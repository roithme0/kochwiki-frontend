import { Component, inject, output } from '@angular/core';
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

import { Observable, forkJoin, take } from 'rxjs';

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
export class FoodstuffCreateFormComponent {
  success = output<void>();

  verboseNames: FoodstuffVerboseNames | null = null;
  unitChoices: FoodstuffUnitChoices | null = null;

  foodstuffBackendService = inject(FoodstuffBackendService);
  snackBarService = inject(SnackBarService);
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
    this.fetchMetaData();
  }

  // submit form to create foodstuff
  // close dialog on success
  onSubmit(): void {
    console.debug(
      'submitting create foodstuff form: ',
      this.foodstuffForm.value
    );
    const foodstuff: Partial<Foodstuff> = this.foodstuffForm.value as Foodstuff;

    this.foodstuffBackendService
      .postFoodstuff(foodstuff)
      .pipe(take(1))
      .subscribe({
        next: (foodstuff) => {
          console.info('foodstuff created: ', foodstuff);
          this.snackBarService.open('Lebensmittel erstellt');
          this.foodstuffBackendService.notifyFoodstuffsChanged();
          this.success.emit();
        },
        error: (error) => {
          console.error('failed to create foodstuff: ', error);
          this.snackBarService.open(
            'Lebensmittel konnte nicht erstellt werden'
          );
        },
      });
  }

  fetchMetaData(): void {
    const requests: Observable<any> = forkJoin({
      verboseNames: this.foodstuffBackendService.fetchFoodstuffVerboseNames(),
      unitChoices: this.foodstuffBackendService.fetchFoodstuffUnitChoices(),
    });

    requests.pipe(take(1)).subscribe({
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
