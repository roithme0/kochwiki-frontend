import {
  Component,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';

import { ShoppingListBackendService } from '../../services/shopping-list-backend.service';

import { ShoppingListItemIngredient } from '../../interfaces/shopping-list-item-ingredient';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-list-table-pin-button',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './shopping-list-table-pin-button.component.html',
  styleUrl: './shopping-list-table-pin-button.component.css',
})
export class ShoppingListTablePinButtonComponent {
  itemIngredient = input.required<ShoppingListItemIngredient>();

  shoppingListBackendService = inject(ShoppingListBackendService);

  isPinned: WritableSignal<boolean> = signal(false);

  isLoading: WritableSignal<boolean> = signal(false);
  hasError: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.isPinned.set(this.itemIngredient().isPinned);
  }

  OnClick() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.shoppingListBackendService
      .setIsPinned(this.itemIngredient(), !this.isPinned())
      .subscribe({
        next: (itemIngredient: ShoppingListItemIngredient) => {
          this.isPinned.set(itemIngredient.isPinned);
          this.isLoading.set(false);
        },
        error: (error: any) => {
          console.error('Error setting isPinned: ', error);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }
}
