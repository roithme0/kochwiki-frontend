import {
  Component,
  WritableSignal,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffBackendService } from '../../../../foodstuffs/services/foodstuff-backend.service';
import { RecipeBackendService } from '../../../services/recipe-backend.service';
import { SnackBarService } from '../../../../services/snack-bar.service';

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
import { MatIconModule } from '@angular/material/icon';
import { take, takeUntil } from 'rxjs';
import { Unsubscribe } from '../../../../utils/unsubsribe';

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
    MatIconModule,
  ],
  templateUrl: './recipe-patch-form.component.html',
  styleUrl: './recipe-patch-form.component.css',
})
export class RecipePatchFormComponent extends Unsubscribe {
  id = input.required<number>();
  success = output<void>();

  fb = inject(FormBuilder);
  foodstuffBackendService = inject(FoodstuffBackendService);
  recipeBackendService = inject(RecipeBackendService);
  snackBarService = inject(SnackBarService);

  foodstuffs!: Foodstuff[];
  recipe!: Recipe;

  isLoadingFoodstuffs: WritableSignal<boolean> = signal(true);
  hasErrorFoodstuffs: WritableSignal<boolean> = signal(false);
  isLoadingRecipe: WritableSignal<boolean> = signal(true);
  hasErrorRecipe: WritableSignal<boolean> = signal(false);

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
    super();
    this.foodstuffBackendService.foodstuffs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchAllFoodstuffs();
      });
  }

  ngOnInit(): void {
    this.fetchAllFoodstuffs();
    this.fetchRecipe();
  }

  // fetch all foodstuffs for adding ingredients to recipe
  fetchAllFoodstuffs(): void {
    this.foodstuffBackendService
      .getAllFoodstuffs()
      .pipe(take(1))
      .subscribe({
        next: (foodstuffs) => {
          console.debug('fetched foodstuffs: ', foodstuffs);
          this.foodstuffs = foodstuffs;
          this.isLoadingFoodstuffs.set(false);
          this.hasErrorFoodstuffs.set(false);
        },
        error: (error) => {
          console.error('failed to fetch foodstuffs: ', error);
          this.snackBarService.open('Zutaten konnten nicht geladen werden');
          this.isLoadingFoodstuffs.set(false);
          this.hasErrorFoodstuffs.set(true);
        },
      });
  }

  // fetch recipe wich is to be edited
  fetchRecipe(): void {
    this.recipeBackendService
      .getRecipeById(this.id())
      .pipe(take(1))
      .subscribe({
        next: (recipe) => {
          console.debug('fetched recipe: ', recipe);
          this.recipe = recipe;
          this.isLoadingRecipe.set(false);
          this.hasErrorRecipe.set(false);
        },
        error: (error) => {
          console.error('failed to fetch recipe: ', error);
          this.snackBarService.open('Rezept konnte nicht geladen werden');
          this.isLoadingRecipe.set(false);
          this.hasErrorRecipe.set(true);
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
    this.recipeBackendService
      .patchRecipe(this.id(), recipe)
      .pipe(take(1))
      .subscribe({
        next: (recipe) => {
          console.info('recipe patched: ', recipe);
          this.snackBarService.open('Rezept aktualisiert');
          this.success.emit();
          this.recipeBackendService.notifyRecipesChanged();
        },
        error: (error) => {
          console.error('failed to patch recipe: ', error);
          this.snackBarService.open('Rezept konnte nicht aktualisiert werden');
        },
      });
  }
}
