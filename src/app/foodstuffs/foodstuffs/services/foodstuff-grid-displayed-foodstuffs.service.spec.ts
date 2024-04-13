import { TestBed } from '@angular/core/testing';

import { FoodstuffsGridDisplayedFoodstuffsService } from './foodstuff-grid-displayed-foodstuffs.service';

describe('FoodstuffsGridDisplayedFoodstuffsService', () => {
  let service: FoodstuffsGridDisplayedFoodstuffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffsGridDisplayedFoodstuffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
