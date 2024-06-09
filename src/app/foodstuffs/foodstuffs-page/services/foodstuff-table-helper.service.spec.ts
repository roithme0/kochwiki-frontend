import { TestBed } from '@angular/core/testing';

import { FoodstuffTableHelperService } from './foodstuff-table-helper.service';

describe('FoodstuffTableHelperService', () => {
  let service: FoodstuffTableHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffTableHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
