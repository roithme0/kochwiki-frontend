import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeService } from '../../../services/recipe.service';
import { FoodstuffService } from '../../../../../foodstuffs/shared/services/foodstuff.service';

import { Foodstuff } from '../../../../../foodstuffs/shared/interfaces/foodstuff';
import { Recipe } from '../../../interfaces/recipe';

import { RecipeMetaFormComponent } from '../../shared/recipe-meta-form/recipe-meta-form.component';
import { RecipeAmountsFormComponent } from '../../shared/recipe-amounts-form/recipe-amounts-form.component';
import { RecipePreparationFormComponent } from '../../shared/recipe-preparation-form/recipe-preparation-form.component';

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
    RecipeAmountsFormComponent,
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
  @Input() id: number | undefined;
  @Output() success: EventEmitter<void> = new EventEmitter();

  fb = inject(FormBuilder);
  recipeService = inject(RecipeService);
  foodstuffService = inject(FoodstuffService);

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
    amountsFormGroup: this.fb.group({
      servings: [<number | null>null, Validators.required],
      amounts: this.fb.array([]),
    }),
    preparationFormGroup: this.fb.group({
      preptime: [<number | null>null],
      steps: this.fb.array([]),
    }),
  });

  constructor() {
    this.foodstuffService.foodstuffs$.subscribe(() => {
      this.fetchAllFoodstuffs();
    });
  }

  ngOnInit(): void {
    this.fetchAllFoodstuffs();
    this.fetchRecipe();
  }

  // fetch all foodstuffs for adding amounts to recipe
  fetchAllFoodstuffs(): void {
    this.foodstuffService.getAllFoodstuffs().subscribe({
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
    if (this.id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.recipeService.getRecipeById(this.id).subscribe({
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
      ...formValue.amountsFormGroup,
      ...formValue.preparationFormGroup,
    } as Recipe;

    if (this.id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.recipeService.patchRecipe(this.id, recipe).subscribe({
      next: (recipe) => {
        console.info('recipe patched: ', recipe);
        this.success.emit();
        this.recipeService.notifyRecipesChanged();
      },
      error: (error) => {
        console.error('failed to patch recipe: ', error);
      },
    });
  }
}
