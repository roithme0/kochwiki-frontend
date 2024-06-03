import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodstuffCreateDialogComponent } from '../../dialogs/foodstuff-create-dialog/foodstuff-create-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-foodstuffs-table-create-foodstuff',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './foodstuffs-table-create-foodstuff.component.html',
  styleUrl: './foodstuffs-table-create-foodstuff.component.css',
})
export class FoodstuffsTableCreateFoodstuffComponent {
  dialog = inject(MatDialog);

  openCreateFoodstuffDialog(): void {
    this.dialog.open(FoodstuffCreateDialogComponent, {
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
      disableClose: true,
    });
  }
}
