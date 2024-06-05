import { TestBed } from '@angular/core/testing';

import { ShoppingListTableDisplayedItemsService } from './shopping-list-table-displayed-items.service';

describe('ShoppingListTableDisplayedItemsService', () => {
  let service: ShoppingListTableDisplayedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListTableDisplayedItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
