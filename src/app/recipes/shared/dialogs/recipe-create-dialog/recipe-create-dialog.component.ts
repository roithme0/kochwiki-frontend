import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeCreateFormComponent } from './recipe-create-form/recipe-create-form.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-create-dialog',
  standalone: true,
  imports: [CommonModule, RecipeCreateFormComponent, MatDialogContent],
  templateUrl: './recipe-create-dialog.component.html',
  styleUrl: './recipe-create-dialog.component.css',
})
export class RecipeCreateDialogComponent {
  // render form to create a recipe
  dialogRef: MatDialogRef<RecipeCreateDialogComponent> = inject(MatDialogRef);
}
