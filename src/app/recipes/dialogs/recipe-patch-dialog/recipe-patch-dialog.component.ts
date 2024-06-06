import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarService } from '../../../services/snack-bar.service';

import { RecipePatchFormComponent } from './recipe-patch-form/recipe-patch-form.component';
import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-patch-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RecipePatchFormComponent,
    DialogHeaderComponent,
    MatDialogModule,
  ],
  templateUrl: './recipe-patch-dialog.component.html',
  styleUrl: './recipe-patch-dialog.component.css',
})
export class RecipePatchDialogComponent {
  dialogRef = inject(MatDialogRef);
  snackBarService = inject(SnackBarService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {}

  OnSuccess() {
    this.dialogRef.close();
    this.snackBarService.open('Rezept aktualisiert');
  }
}
