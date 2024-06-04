import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffBackendService } from '../../../../foodstuffs/services/foodstuff-backend.service';
import { RecipeBackendService } from '../../../services/recipe-backend.service';

import { Foodstuff } from '../../../../foodstuffs/interfaces/foodstuff';
import { Recipe } from '../../../interfaces/recipe';

import { RecipeMetaFormComponent } from '../../forms/recipe-meta-form/recipe-meta-form.component';
import { RecipeIngredientsFormComponent } from '../../forms/recipe-ingredients-form/recipe-ingredients-form.component';
import { RecipePreparationFormComponent } from '../../forms/recipe-preparation-form/recipe-preparation-form.component';

import { MatButtonModule } from '@angular/material/button';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-recipe-patch-form',
  standalone: true,
  imports: [
    CommonModule,
    RecipeMetaFormComponent,
    RecipeIngredientsFormComponent,
    RecipePreparationFormComponent,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './recipe-patch-form.component.html',
  styleUrl: './recipe-patch-form.component.css',
})
// fetch foodstuff associated with recipe
// render form with values to edit recipe
export class RecipePatchFormComponent {
  id = input.required<number>();
  success = output<void>();

  fb = inject(FormBuilder);
  foodstuffBackendService = inject(FoodstuffBackendService);
  recipeBackendService = inject(RecipeBackendService);

  foodstuffs!: Foodstuff[];
  recipe!: Recipe;

  isLoadingFetchAllFoodstuffs: boolean = true;
  hasErrorFetchAllFoodstuffs: boolean = false;
  isLoadingFetchRecipe: boolean = true;
  hasErrorFetchRecipe: boolean = false;

  recipeForm = this.fb.group({
    metaFormGroup: this.fb.group({
      name: ['', Validators.required],
      // image: [<File | null>null],
      originName: [''],
      originUrl: [''],
      // original: [<File | null>null],
    }),
    ingredientsFormGroup: this.fb.group({
      servings: [<number | null>null, Validators.required],
      ingredients: this.fb.array([]),
    }),
    preparationFormGroup: this.fb.group({
      preptime: [<number | null>null],
      steps: this.fb.array([]),
    }),
  });

  constructor() {
    this.foodstuffBackendService.foodstuffs$.subscribe(() => {
      this.fetchAllFoodstuffs();
    });
  }

  ngOnInit(): void {
    this.fetchAllFoodstuffs();
    this.fetchRecipe();
  }

  // fetch all foodstuffs for adding ingredients to recipe
  fetchAllFoodstuffs(): void {
    this.foodstuffBackendService.getAllFoodstuffs().subscribe({
      next: (foodstuffs) => {
        console.debug('fetched foodstuffs: ', foodstuffs);
        this.foodstuffs = foodstuffs;

        this.isLoadingFetchAllFoodstuffs = false;
        this.hasErrorFetchAllFoodstuffs = false;
      },
      error: (error) => {
        console.error('failed to fetch foodstuffs: ', error);

        this.isLoadingFetchAllFoodstuffs = false;
        this.hasErrorFetchAllFoodstuffs = true;
      },
    });
  }

  // fetch recipe wich is to be edited
  fetchRecipe(): void {
    this.recipeBackendService.getRecipeById(this.id()).subscribe({
      next: (recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipe = recipe;

        this.isLoadingFetchRecipe = false;
        this.hasErrorFetchRecipe = false;
      },
      error: (error) => {
        console.error('failed to fetch recipe: ', error);

        this.isLoadingFetchRecipe = false;
        this.hasErrorFetchRecipe = true;
      },
    });
  }

  onSubmit(): void {
    const formValue = this.recipeForm.value;
    console.debug('submitting edit recipe form: ', formValue);
    const recipe: Partial<Recipe> = {
      ...formValue.metaFormGroup,
      ...formValue.ingredientsFormGroup,
      ...formValue.preparationFormGroup,
    } as Recipe;
    this.recipeBackendService.patchRecipe(this.id(), recipe).subscribe({
      next: (recipe) => {
        console.info('recipe patched: ', recipe);
        this.success.emit();
        this.recipeBackendService.notifyRecipesChanged();
      },
      error: (error) => {
        console.error('failed to patch recipe: ', error);
      },
    });
  }
}
