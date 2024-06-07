import { Component, Signal, inject } from '@angular/core';

import { PageHeaderService } from '../../services/page-header.service';
import { ShoppingListTableHelperService } from './services/shopping-list-table-helper.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ShoppingListTableComponent } from './shopping-list-table/shopping-list-table.component';
import { ShoppingListTableControlsComponent } from './shopping-list-table-controls/shopping-list-table-controls.component';
import { ShoppingListTableButtonsComponent } from './shopping-list-table-buttons/shopping-list-table-buttons.component';

import { ShoppingList } from '../interfaces/shopping-list';

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
  shoppingListTableHelperService = inject(ShoppingListTableHelperService);

  isLoadingShoppingList: Signal<boolean> =
    this.shoppingListTableHelperService.isLoading;
  hasErrorShoppingList: Signal<boolean> =
    this.shoppingListTableHelperService.hasError;
  shoppingList: Signal<ShoppingList | null> =
    this.shoppingListTableHelperService.shoppingList;

  // set header values
  ngOnInit() {
    this.pageHeaderService.headline = 'Einkaufsliste';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
