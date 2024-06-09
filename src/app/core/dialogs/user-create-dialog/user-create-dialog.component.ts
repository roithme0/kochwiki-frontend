import { Component, inject } from '@angular/core';

import { UserCreateFormComponent } from './user-create-form/user-create-form.component';
import { DialogHeaderComponent } from '../../../components/dialog-header/dialog-header.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create-dialog',
  standalone: true,
  imports: [UserCreateFormComponent, DialogHeaderComponent, MatDialogModule],
  templateUrl: './user-create-dialog.component.html',
  styleUrl: './user-create-dialog.component.css',
})
export class UserCreateDialogComponent {
  dialogRef = inject(MatDialogRef);
}
