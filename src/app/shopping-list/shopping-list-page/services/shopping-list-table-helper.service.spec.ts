import { TestBed } from '@angular/core/testing';

import { ShoppingListTableHelperService } from './shopping-list-table-helper.service';

describe('ShoppingListTableHelperService', () => {
  let service: ShoppingListTableHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListTableHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
