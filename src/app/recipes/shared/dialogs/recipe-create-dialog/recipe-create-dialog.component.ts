import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeCreateFormComponent } from './recipe-create-form/recipe-create-form.component';
import { DialogHeaderComponent } from '../../../../shared/dialog-header/dialog-header.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-recipe-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RecipeCreateFormComponent,
    DialogHeaderComponent,
    MatDialogModule,
  ],
  templateUrl: './recipe-create-dialog.component.html',
  styleUrl: './recipe-create-dialog.component.css',
})
export class RecipeCreateDialogComponent {
  // render form to create a recipe
  dialogRef: MatDialogRef<RecipeCreateDialogComponent> = inject(MatDialogRef);
}
