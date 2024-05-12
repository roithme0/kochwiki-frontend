import { TestBed } from '@angular/core/testing';

import { FoodstuffTableHelperServiceService } from './foodstuff-table-helper-service.service';

describe('FoodstuffTableHelperServiceService', () => {
  let service: FoodstuffTableHelperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffTableHelperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
