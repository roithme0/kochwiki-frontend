import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

import { FoodstuffCreateFormComponent } from './foodstuff-create-form/foodstuff-create-form.component';

@Component({
  selector: 'app-ingredient-create-dialog',
  standalone: true,
  imports: [CommonModule, FoodstuffCreateFormComponent, MatDialogContent],
  templateUrl: './ingredient-create-dialog.component.html',
  styleUrl: './ingredient-create-dialog.component.css',
})
// render foodstuff-create-form
export class IngredientCreateDialogComponent {
  dialogRef = inject(MatDialogRef);
}
