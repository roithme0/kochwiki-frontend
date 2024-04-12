import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

import { IngredientCreateFormComponent } from './ingredient-create-form/ingredient-create-form.component';

@Component({
  selector: 'app-ingredient-create-dialog',
  standalone: true,
  imports: [CommonModule, IngredientCreateFormComponent, MatDialogContent],
  templateUrl: './ingredient-create-dialog.component.html',
  styleUrl: './ingredient-create-dialog.component.css',
})
export class IngredientCreateDialogComponent {
  // render ingredient-create-form
  dialogRef = inject(MatDialogRef);
}
