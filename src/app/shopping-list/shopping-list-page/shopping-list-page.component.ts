import { Component, Signal, inject } from '@angular/core';

import { PageHeaderService } from '../../services/page-header.service';
import { ShoppingListService } from './services/shopping-list.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ShoppingListTableComponent } from './shopping-list-table/shopping-list-table.component';
import { ShoppingListTableControlsComponent } from './shopping-list-table-controls/shopping-list-table-controls.component';
import { ShoppingListTableButtonsComponent } from './shopping-list-table-buttons/shopping-list-table-buttons.component';

import { ShoppingList } from '../interfaces/shopping-list';
import { ShoppingListItemVerboseNames } from '../interfaces/shopping-list-meta-data';

@Component({
  selector: 'app-shopping-list-page',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    ShoppingListTableComponent,
    ShoppingListTableControlsComponent,
    ShoppingListTableButtonsComponent,
  ],
  templateUrl: './shopping-list-page.component.html',
  styleUrl: './shopping-list-page.component.css',
})
export class ShoppingListPageComponent {
  pageHeaderService = inject(PageHeaderService);
  shoppingListService = inject(ShoppingListService);

  isLoadingShoppingList: Signal<boolean> = this.shoppingListService.isLoading;
  hasErrorShoppingList: Signal<boolean> = this.shoppingListService.hasError;
  shoppingList: Signal<ShoppingList | null> =
    this.shoppingListService.shoppingList;
  shoppingListItemVerboseNames: Signal<ShoppingListItemVerboseNames | null> =
    this.shoppingListService.shoppingListItemVerboseNames;

  // set header values
  ngOnInit() {
    this.pageHeaderService.headline = 'Einkaufsliste';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
