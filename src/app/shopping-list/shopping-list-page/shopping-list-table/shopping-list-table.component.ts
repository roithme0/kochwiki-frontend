import { Component, Signal, computed, inject, input } from '@angular/core';

import { ShoppingList } from '../../interfaces/shopping-list';
import { ShoppingListItemIngredient } from '../../interfaces/shopping-list-item-ingredient';

import { ShoppingListTableDisplayedFieldsService } from '../services/shopping-list-table-displayed-fields.service';
import { ShoppingListBackendService } from '../../services/shopping-list-backend.service';

import { ShoppingListTableCheckboxComponent } from '../shopping-list-table-checkbox/shopping-list-table-checkbox.component';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-shopping-list-table',
  standalone: true,
  imports: [
    ShoppingListTableCheckboxComponent,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './shopping-list-table.component.html',
  styleUrl: './shopping-list-table.component.css',
})
export class ShoppingListTableComponent {
  shoppingList = input.required<ShoppingList | null>();
  shoppingListBackendService = inject(ShoppingListBackendService);

  displayedFieldsService = inject(ShoppingListTableDisplayedFieldsService);

  displayedItemIngredients: Signal<ShoppingListItemIngredient[]> = computed(
    () => {
      const shoppingList: ShoppingList | null = this.shoppingList();
      if (shoppingList == null) {
        return [];
      }
      return shoppingList.shoppingListItemIngredients;
    }
  );
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;

  allItemIngredientsIsChecked: Signal<boolean> = computed(() => {
    const itemIngredients: ShoppingListItemIngredient[] =
      this.displayedItemIngredients();
    return itemIngredients.every((itemIngredient) => itemIngredient.isChecked);
  });

  OnHeaderCheckBoxClick() {}

  OnPinClick(itemIngredient: ShoppingListItemIngredient) {
    // this.shoppingListBackendService.setIsPinned(
    //   itemIngredient,
    //   !itemIngredient.isPinned
    // ).subscribe();
  }
}
