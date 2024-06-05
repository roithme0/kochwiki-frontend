import { Component, inject } from '@angular/core';

import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-shopping-list-page',
  standalone: true,
  imports: [],
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
