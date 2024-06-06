import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FoodstuffPatchFormComponent } from './foodstuff-patch-form/foodstuff-patch-form.component';
import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';

import { SnackBarService } from '../../../services/snack-bar.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-foodstuff-patch-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FoodstuffPatchFormComponent,
    DialogHeaderComponent,
    MatDialogModule,
  ],
  templateUrl: './foodstuff-patch-dialog.component.html',
  styleUrl: './foodstuff-patch-dialog.component.css',
})
// get foodstuff id from mat dialog data
// render foodstuff-patch-form
export class FoodstuffPatchDialogComponent {
  dialogRef = inject(MatDialogRef);
  snackBarService = inject(SnackBarService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {}

  OnSuccess() {
    this.dialogRef.close();
    this.snackBarService.open('Änderungen gespeichert');
  }
}
