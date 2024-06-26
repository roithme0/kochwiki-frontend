import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { FoodstuffCreateFormComponent } from './foodstuff-create-form/foodstuff-create-form.component';
import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';

import { SnackBarService } from '../../../services/snack-bar.service';

@Component({
  selector: 'app-foodstuff-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FoodstuffCreateFormComponent,
    DialogHeaderComponent,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './foodstuff-create-dialog.component.html',
  styleUrl: './foodstuff-create-dialog.component.css',
})
// render foodstuff-create-form
export class FoodstuffCreateDialogComponent {
  dialogRef = inject(MatDialogRef);
  snackBarService = inject(SnackBarService);

  OnSuccess() {
    this.dialogRef.close();
    this.snackBarService.open('Zutat erstellt');
  }
}
