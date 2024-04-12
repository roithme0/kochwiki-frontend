import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipePatchFormComponent } from './recipe-patch-form/recipe-patch-form.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-patch-dialog',
  standalone: true,
  imports: [CommonModule, RecipePatchFormComponent, MatDialogContent],
  templateUrl: './recipe-patch-dialog.component.html',
  styleUrl: './recipe-patch-dialog.component.css',
})
export class RecipePatchDialogComponent {
  dialogRef: MatDialogRef<RecipePatchDialogComponent> = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {}
}
