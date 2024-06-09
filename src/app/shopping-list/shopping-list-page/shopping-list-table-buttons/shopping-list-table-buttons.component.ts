import { Component, WritableSignal, inject, signal } from '@angular/core';

import { ShoppingListBackendService } from '../../services/shopping-list-backend.service';
import { ShoppingListTableHelperService } from '../services/shopping-list-table-helper.service';
import { ActiveCustomUserService } from '../../../services/active-custom-user.service';
import { SnackBarService } from '../../../services/snack-bar.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CustomUser } from '../../../interfaces/custom-user';

@Component({
  selector: 'app-shopping-list-table-buttons',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './shopping-list-table-buttons.component.html',
  styleUrl: './shopping-list-table-buttons.component.css',
})
export class ShoppingListTableButtonsComponent {
  shoppingListBackendService = inject(ShoppingListBackendService);
  shoppingListTableHelperService = inject(ShoppingListTableHelperService);
  activeCustomUserService = inject(ActiveCustomUserService);
  snackBarService = inject(SnackBarService);

  isLoading: WritableSignal<boolean> = signal(false);
  hasError: WritableSignal<boolean> = signal(false);

  OnClearCheckedClicked() {
    this.isLoading.set(true);
    this.hasError.set(false);

    const activeCustomUser: CustomUser | null =
      this.activeCustomUserService.activeCustomUser();
    if (activeCustomUser === null) {
      console.error('No active custom user found.');
      return;
    }

    this.shoppingListBackendService.clearChecked().subscribe({
      next: (shoppingList) => {
        console.info('Shopping list cleared.');
        this.shoppingListTableHelperService.shoppingList = shoppingList;
        this.snackBarService.open('Abgehakte Artikel gelöscht');
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error clearing shopping list:', error);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
