import { Component, inject } from '@angular/core';

import { PageHeaderService } from '../../services/page-header.service';

import { ShoppingListTableComponent } from './shopping-list-table/shopping-list-table.component';
import { ShoppingListTableControlsComponent } from './shopping-list-table-controls/shopping-list-table-controls.component';
import { ShoppingListTableButtonsComponent } from './shopping-list-table-buttons/shopping-list-table-buttons.component';

@Component({
  selector: 'app-shopping-list-page',
  standalone: true,
  imports: [
    ShoppingListTableComponent,
    ShoppingListTableControlsComponent,
    ShoppingListTableButtonsComponent,
  ],
  templateUrl: './shopping-list-page.component.html',
  styleUrl: './shopping-list-page.component.css',
})
export class ShoppingListPageComponent {
  pageHeaderService = inject(PageHeaderService);

  // set header values
  ngOnInit() {
    this.pageHeaderService.headline = 'Einkaufsliste';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = true;
  }
}
