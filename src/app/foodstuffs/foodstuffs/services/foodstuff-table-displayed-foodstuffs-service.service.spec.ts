import { TestBed } from '@angular/core/testing';

import { FoodstuffTableDisplayedFoodstuffsServiceService } from './foodstuff-table-displayed-foodstuffs-service.service';

describe('FoodstuffTableDisplayedFoodstuffsServiceService', () => {
  let service: FoodstuffTableDisplayedFoodstuffsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffTableDisplayedFoodstuffsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
