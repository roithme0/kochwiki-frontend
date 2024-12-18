import {
  Component,
  WritableSignal,
  inject,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { FoodstuffBackendService } from '../../../../foodstuffs/services/foodstuff-backend.service';
import { RecipeBackendService } from '../../../services/recipe-backend.service';
import { SnackBarService } from '../../../../services/snack-bar.service';

import { Foodstuff } from '../../../../foodstuffs/interfaces/foodstuff';
import { Recipe } from '../../../interfaces/recipe';

import { RecipeMetaFormComponent } from '../../forms/recipe-meta-form/recipe-meta-form.component';
import { RecipeIngredientsFormComponent } from '../../forms/recipe-ingredients-form/recipe-ingredients-form.component';
import { RecipePreparationFormComponent } from '../../forms/recipe-preparation-form/recipe-preparation-form.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { Unsubscribe } from '../../../../utils/unsubsribe';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe-create-form',
  standalone: true,
  imports: [
    CommonModule,
    RecipeMetaFormComponent,
    RecipeIngredientsFormComponent,
    RecipePreparationFormComponent,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatStepperModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './recipe-create-form.component.html',
  styleUrl: './recipe-create-form.component.css',
})
// fetch all foodstuffs
// render form to create recipe
export class RecipeCreateFormComponent extends Unsubscribe {
  fb = inject(FormBuilder);
  foodstuffBackendService = inject(FoodstuffBackendService);
  recipeBackendService = inject(RecipeBackendService);
  snackBarService = inject(SnackBarService);

  success = output<void>();

  foodstuffs!: Foodstuff[];

  isLoading: WritableSignal<boolean> = signal(true);
  hasError: WritableSignal<boolean> = signal(false);

  recipeForm = this.fb.group({
    metaFormGroup: this.fb.group({
      name: ['', Validators.required],
      // image: [<File | null>null],
      originName: [''],
      originUrl: [''],
      // original: [<File | null>null],
    }),
    ingredientsFormGroup: this.fb.group({
      servings: [2, Validators.required],
      ingredients: this.fb.array([]),
    }),
    preparationFormGroup: this.fb.group({
      preptime: [<number | null>null],
      steps: this.fb.array([]),
    }),
  });

  constructor() {
    super();

    this.foodstuffBackendService.foodstuffs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchFoodstuffs();
      });
  }

  ngOnInit(): void {
    this.fetchFoodstuffs();
  }

  fetchFoodstuffs(): void {
    this.foodstuffBackendService
      .getAllFoodstuffs()
      .pipe(take(1))
      .subscribe({
        next: (foodstuffs) => {
          console.debug('fetched foodstuffs: ', foodstuffs);
          this.foodstuffs = foodstuffs;
          this.isLoading.set(false);
          this.hasError.set(false);
        },
        error: (error) => {
          console.error('failed to fetch foodstuffs: ', error);
          this.snackBarService.open('Zutaten konnten nicht geladen werden');
          this.isLoading.set(false);
          this.hasError.set(true);
        },
      });
  }

  // onUpload(event: any, field: string): void {
  //   console.debug(`uploading ${field}: `, event);
  //   const file = event.target.files[0];
  //   this.recipeForm.patchValue({
  //     [field]: file,
  //   });
  // }

  // onSubmit(): void {
  //   console.debug('submitting create recipe form: ', this.recipeForm.value);
  //   const formData = new FormData();

  //   Object.keys(this.recipeForm.value).forEach((key) => {
  //     if (['image', 'original'].includes(key)) {
  //       // handle files seperately
  //       const control = this.recipeForm.get(key);
  //       const file = control?.value;
  //       file ? formData.append(key, file, file.name) : formData.append(key, '');
  //     } else {
  //       // handle all other form data
  //       const value = this.recipeForm.get(key)?.value;
  //       formData.append(key, value || '');
  //     }
  //   });

  //   this.recipeBackendService.postRecipe(formData).subscribe({
  //     next: (recipe) => {
  //       console.debug('recipe created: ', recipe);
  //       this.success.emit();
  //       this.recipeBackendService.notifyRecipesChanged();
  //     },
  //     error: (error) => {
  //       console.error('failed to create recipe: ', error);
  //     },
  //   });
  // }

  onSubmit(): void {
    const formValue = this.recipeForm.value;
    console.debug('submitting create recipe form: ', formValue);
    const recipe: Partial<Recipe> = {
      ...formValue.metaFormGroup,
      ...formValue.ingredientsFormGroup,
      ...formValue.preparationFormGroup,
    } as Recipe;
    this.recipeBackendService
      .postRecipe(recipe)
      .pipe(take(1))
      .subscribe({
        next: (recipe) => {
          console.info('recipe created: ', recipe);
          this.snackBarService.open('Rezept erstellt');
          this.success.emit();
          this.recipeBackendService.notifyRecipesChanged();
        },
        error: (error) => {
          console.error('failed to create recipe: ', error);
          this.snackBarService.open('Rezept konnte nicht erstellt werden');
        },
      });
  }
}
