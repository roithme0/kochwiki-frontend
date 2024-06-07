import {
  Component,
  Signal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { ShoppingList } from '../../interfaces/shopping-list';
import { ShoppingListItemIngredient } from '../../interfaces/shopping-list-item-ingredient';

import { ShoppingListTableDisplayedFieldsService } from '../services/shopping-list-table-displayed-fields.service';

import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-shopping-list-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './shopping-list-table.component.html',
  styleUrl: './shopping-list-table.component.css',
})
export class ShoppingListTableComponent {
  shoppingList = input.required<ShoppingList | null>();

  displayedFieldsService = inject(ShoppingListTableDisplayedFieldsService);

  displayedIngredients: Signal<ShoppingListItemIngredient[]> = computed(() => {
    const shoppingList: ShoppingList | null = this.shoppingList();
    if (shoppingList == null) {
      return [];
    }
    return shoppingList.shoppingListItemIngredients;
  });
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.displayedFields;
}
