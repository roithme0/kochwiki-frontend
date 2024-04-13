import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { RecipeService } from '../../../../shared/services/recipe.service';
import { IngredientService } from '../../../../../ingredients/shared/services/ingredient.service';

import { Foodstuff } from '../../../../../ingredients/shared/interfaces/foodstuff';
import { Recipe } from '../../../interfaces/recipe';

import { RecipeMetaFormComponent } from '../../shared/recipe-meta-form/recipe-meta-form.component';
import { RecipeAmountsFormComponent } from '../../shared/recipe-amounts-form/recipe-amounts-form.component';
import { RecipePreparationFormComponent } from '../../shared/recipe-preparation-form/recipe-preparation-form.component';

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

@Component({
  selector: 'app-recipe-create-form',
  standalone: true,
  imports: [
    CommonModule,
    RecipeMetaFormComponent,
    RecipeAmountsFormComponent,
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
export class RecipeCreateFormComponent {
  // fetch all ingredients
  // render form to create recipe
  fb: FormBuilder = inject(FormBuilder);
  recipeService: RecipeService = inject(RecipeService);
  ingredientService: IngredientService = inject(IngredientService);

  @Output() success: EventEmitter<void> = new EventEmitter();

  ingredients!: Foodstuff[];

  isLoadingFetchAllIngredients: boolean = true;
  hasErrorFetchAllIngredients: boolean = false;

  recipeForm = this.fb.group({
    metaFormGroup: this.fb.group({
      name: ['', Validators.required],
      // image: [<File | null>null],
      originName: [''],
      originUrl: [''],
      // original: [<File | null>null],
    }),
    amountsFormGroup: this.fb.group({
      servings: [2, Validators.required],
      amounts: this.fb.array([]),
    }),
    preparationFormGroup: this.fb.group({
      preptime: [<number | null>null],
      steps: this.fb.array([]),
    }),
  });

  constructor() {
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
  }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.debug('fetched ingredients: ', ingredients);
        this.ingredients = ingredients;

        this.isLoadingFetchAllIngredients = false;
        this.hasErrorFetchAllIngredients = false;
      },
      error: (error) => {
        console.error('failed to fetch ingredients: ', error);

        this.isLoadingFetchAllIngredients = false;
        this.hasErrorFetchAllIngredients = true;
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

  //   this.recipeService.postRecipe(formData).subscribe({
  //     next: (recipe) => {
  //       console.debug('recipe created: ', recipe);
  //       this.success.emit();
  //       this.recipeService.notifyRecipesChanged();
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
      ...formValue.amountsFormGroup,
      ...formValue.preparationFormGroup,
    } as Recipe;
    this.recipeService.postRecipe(recipe).subscribe({
      next: (recipe) => {
        console.info('recipe created: ', recipe);
        this.success.emit();
        this.recipeService.notifyRecipesChanged();
      },
      error: (error) => {
        console.error('failed to create recipe: ', error);
      },
    });
  }
}
