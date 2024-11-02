import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarService } from '../../../services/snack-bar.service';

import { RecipeCreateFormComponent } from './recipe-create-form/recipe-create-form.component';
import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';

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
  styleUrl: './recipe-create-dialog.component.scss',
})
export class RecipeCreateDialogComponent {
  dialogRef = inject(MatDialogRef);
  snackBarService = inject(SnackBarService);

  OnSuccess() {
    this.dialogRef.close();
    this.snackBarService.open('Rezept erstellt');
  }
}
