import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Foodstuff } from '../../../../../foodstuffs/shared/interfaces/foodstuff';
import { Ingredient } from '../../../interfaces/ingredient';
import { Recipe } from '../../../interfaces/recipe';

import { FoodstuffCreateDialogComponent } from '../../../../../foodstuffs/shared/dialogs/foodstuff-create-dialog/foodstuff-create-dialog.component';
import { IngredientFieldComponent } from './ingredient-field/ingredient-field.component';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recipe-amounts-form',
  standalone: true,
  imports: [
    CommonModule,
    IngredientFieldComponent,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  templateUrl: './recipe-amounts-form.component.html',
  styleUrl: './recipe-amounts-form.component.css',
})
export class RecipeAmountsFormComponent {
  @Input() foodstuffs!: Foodstuff[];
  @Input() recipe?: Recipe;

  recipeFormDirective = inject(FormGroupDirective);
  fb: FormBuilder = inject(FormBuilder);
  dialog: MatDialog = inject(MatDialog);

  recipeForm!: FormGroup;
  amountsFormGroup!: FormGroup;

  ngOnInit() {
    this.recipeForm = this.recipeFormDirective.control;
    this.amountsFormGroup = this.recipeForm.get(
      'amountsFormGroup'
    ) as FormGroup;

    // set form values
    if (this.recipe) {
      this.recipeForm.get('amountsFormGroup')?.patchValue({
        servings: this.recipe.servings,
      });
      this.recipe.ingredients.forEach((ingredient) =>
        this.addAmount(ingredient)
      );
    }
  }

  get amounts(): FormArray {
    return this.recipeForm.get('amountsFormGroup.amounts') as FormArray;
  }

  // add either empty or existing ingredient to form
  addAmount(amount?: Ingredient): void {
    this.amounts.push(
      this.fb.group({
        index: [1, Validators.required],
        // index: [amount?.index ?? null, Validators.required],
        foodstuffId: [amount?.foodstuffId ?? null, Validators.required],
        amount: [amount?.amount ?? null, Validators.required],
      })
    );
  }

  removeAmount(index: number): void {
    this.amounts.removeAt(index);
  }

  openCreateFoodstuffDialog(): void {
    this.dialog.open(FoodstuffCreateDialogComponent);
  }
}
