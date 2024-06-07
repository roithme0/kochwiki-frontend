import { Component, Signal, computed, inject, input } from '@angular/core';

import { ShoppingList } from '../../interfaces/shopping-list';
import { ShoppingListItemIngredient } from '../../interfaces/shopping-list-item-ingredient';
import { ShoppingListItemVerboseNames } from '../../interfaces/shopping-list-meta-data';

import { ShoppingListTableDisplayedFieldsService } from '../services/shopping-list-table-displayed-fields.service';
import { ShoppingListBackendService } from '../../services/shopping-list-backend.service';

import { ShoppingListTableCheckboxComponent } from '../shopping-list-table-checkbox/shopping-list-table-checkbox.component';
import { ShoppingListTablePinButtonComponent } from '../shopping-list-table-pin-button/shopping-list-table-pin-button.component';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-shopping-list-table',
  standalone: true,
  imports: [
    ShoppingListTableCheckboxComponent,
    ShoppingListTablePinButtonComponent,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './shopping-list-table.component.html',
  styleUrl: './shopping-list-table.component.css',
})
export class ShoppingListTableComponent {
  shoppingList = input.required<ShoppingList | null>();
  shoppingListItemVerboseNames =
    input.required<ShoppingListItemVerboseNames | null>();

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
  displayedShoppingListItemVerboseNames: Signal<ShoppingListItemVerboseNames> =
    computed(() => {
      const shoppingListItemVerboseNames: ShoppingListItemVerboseNames | null =
        this.shoppingListItemVerboseNames();
      if (shoppingListItemVerboseNames == null) {
        return {
          name: 'Name',
          amount: 'Menge',
          unitVerbose: 'Einheit',
          brand: 'Marke',
        };
      }
      return shoppingListItemVerboseNames;
    });
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;

  allItemIngredientsIsChecked: Signal<boolean> = computed(() => {
    const itemIngredients: ShoppingListItemIngredient[] =
      this.displayedItemIngredients();
    return itemIngredients.every((itemIngredient) => itemIngredient.isChecked);
  });
}
