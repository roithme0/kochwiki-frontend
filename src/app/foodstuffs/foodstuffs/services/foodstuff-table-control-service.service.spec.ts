import { TestBed } from '@angular/core/testing';

import { FoodstuffTableControlServiceService } from './foodstuff-table-control-service.service';

describe('FoodstuffTableControlServiceService', () => {
  let service: FoodstuffTableControlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffTableControlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
