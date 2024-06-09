import {
  Component,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';

import { ShoppingListBackendService } from '../../services/shopping-list-backend.service';

import { ShoppingListItemIngredient } from '../../interfaces/shopping-list-item-ingredient';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-list-table-checkbox',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './shopping-list-table-checkbox.component.html',
  styleUrl: './shopping-list-table-checkbox.component.css',
})
export class ShoppingListTableCheckboxComponent {
  itemIngredient = input.required<ShoppingListItemIngredient>();

  shoppingListBackendService = inject(ShoppingListBackendService);

  isChecked: WritableSignal<boolean> = signal(false);

  isLoading: WritableSignal<boolean> = signal(false);
  hasError: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.isChecked.set(this.itemIngredient().isChecked);
  }

  OnClick() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.shoppingListBackendService
      .setIsChecked(this.itemIngredient(), !this.isChecked())
      .subscribe({
        next: (itemIngredient: ShoppingListItemIngredient) => {
          this.isChecked.set(itemIngredient.isChecked);
          this.isLoading.set(false);
        },
        error: (error: any) => {
          console.error('Error setting isChecked: ', error);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }
}
