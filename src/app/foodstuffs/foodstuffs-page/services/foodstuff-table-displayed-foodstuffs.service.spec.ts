import { TestBed } from '@angular/core/testing';

import { FoodstuffTableDisplayedFoodstuffsService } from './foodstuff-table-displayed-foodstuffs.service';

describe('FoodstuffTableDisplayedFoodstuffsService', () => {
  let service: FoodstuffTableDisplayedFoodstuffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffTableDisplayedFoodstuffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
