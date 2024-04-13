import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

import { FoodstuffCreateFormComponent } from './foodstuff-create-form/foodstuff-create-form.component';

@Component({
  selector: 'app-foodstuff-create-dialog',
  standalone: true,
  imports: [CommonModule, FoodstuffCreateFormComponent, MatDialogContent],
  templateUrl: './foodstuff-create-dialog.component.html',
  styleUrl: './foodstuff-create-dialog.component.css',
})
// render foodstuff-create-form
export class IngredientCreateDialogComponent {
  dialogRef = inject(MatDialogRef);
}
